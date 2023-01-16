import client from '../../client';
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const Post = ({post}) => {
  const  { 
    title = 'Missing title', 
    name = 'Missing name', 
    categories,
    authorImage
  } = post

  return (
    <article>
      <h1>{title}</h1>
      <span>By {name}</span>
      {categories && (
        <ul>
          Posted in
          {categories.map(category => <li key={category}>{category}</li>)}
        </ul>
      )}
      {authorImage && (
        <div>
          <img
            src={urlFor(authorImage)
              .width(50)
              .url()}
          />
        </div>
      )}
    </article>
  )
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image
}`

export async function getStaticPaths(){
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}

export async function getStaticProps(context){
  //It's important to default the Slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  const post = await client.fetch(
    query,
    { slug }
  )

  return {
    props: {
      post
    }
  }
}

export default Post;