import fs from 'fs'
import path from 'path'
import Newsletter from '../components/Newsletter'

import {compileMDX} from 'next-mdx-remote/rsc' 

const rootDirectory = path.join(process.cwd(), 'content' )

export async function getPostBySlug(slug){
    const realSlug = slug.replace(/\.mdx$/,'')
    const filePath = path.join(rootDirectory, `${realSlug}.mdx`)
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf8'})

    const {content, frontmatter} = await compileMDX({
        source: fileContent,
        components: {Newsletter: Newsletter},
        options: {
            parseFrontmatter: true
        }
    })

    return {content, frontmatter}
}
