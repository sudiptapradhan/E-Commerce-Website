import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

//we create a sanity client function and pass onnly one parameter which is an object inside of which we provide a few properties
export const client = sanityClient ({
    projectId:'n08sxoj6',
    dataset:'production',
    apiVersion:'2022-06-22',
    useCdn:true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

//now we have to be able to use the sanity images

const builder = imageUrlBuilder(client);

//for sanity to give us access to the images
export const urlFor = (source) => builder.image(source);