import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        verify: {
            generateEmailHTML: ({token, req, user}) =>{
                console.log(req, token)
                return '<p> hello pls verify</p>';
            }
        }
    },
    access:{
        read: ()=> true,
        create: ()=> true,
    },
    fields:[
        {
            name: 'role',
            required: true,
            defaultValue: 'user',
            // admin:{
            //     condition: ({req})=> false,
            // },
            type: 'select',
            options: [
                {
                    label: 'Admin',
                    value: 'admin'
                },
                {
                    label: 'User',
                    value: 'user'
                }
            ]
        }
    ]
}