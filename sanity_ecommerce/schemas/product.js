//we'll just export our schema as a basic javascript object
//in this case a sanity schema
export default{
    name:'product',
    title:'Product',
    type:'document',
    fields:[
        //fields are going to be object based, so we create the inner objects inside of a fields array
        //and the first field is going to be an image
        //an array of images

        //Hotspot makes it possible to responsively adapt images to different aspect ratios at display time.
        //A slug is a unique string, often used as part of a URL.
        //options -> source : name ---> it will automatically generate a unique slug based on the name property
        {
            name:'image',
            title:'Image',
            type: 'array',
            of: [{type: 'image'}],
            options: {
                hotspot: true,
            }
        },
        {
            name:'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options:{
                source:'name',
                maxLength: 90,
            }
        },
        {
            name:'price',
            title: 'Price',
            type: 'number'
        },
        {
            name:'details',
            title: 'Details',
            type:'string',
        }
    ]
}