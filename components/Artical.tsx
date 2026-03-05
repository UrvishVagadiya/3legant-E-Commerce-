import React from 'react'
import ButtonText from './ButtonText'
import Link from 'next/link';

const Artical = () => {
    const articles = [
        { id:'1',img: '/article-1.png', title: '7 ways to decor your home', button: <ButtonText text="Read More" linkTo="article" /> },
        { id:'2',img: '/article-2.png', title: 'Kitchen organization', button: <ButtonText text="Read More" linkTo="article" /> },
        { id:'3',img: '/article-3.png', title: 'Decor your bedroom', button: <ButtonText text="Read More" linkTo="article" /> },
    ];
    return (
        <div className='px-5 md:px-10 lg:px-40 my-10 flex flex-col gap-6 w-full'>
            <div className='flex justify-between items-end mb-4'>
                <h2 className='text-3xl md:text-4xl font-[500]'>Articles</h2>
                <Link href={'/blogs'}>
                <div className='pb-1 md:pb-0'>
                    <ButtonText text="More Articles" linkTo="blogs" />
                </div>
                </Link>
            </div>
            <div className='flex flex-col md:flex-row gap-8 md:gap-4 justify-between w-full'>
                {articles.map((article, index) => (
                     <Link
                                href={`/blogs/${article.id}`}
                                key={article.id}
                                className={`flex flex-col md:flex-row md:items-center md:gap-8`}
                              >
                    <div key={index} className='w-full'>
                        <img className='w-full object-cover mt-3' src={article.img} alt={article.title} />
                        <h3 className='my-3 text-base font-[500]'>{article.title}</h3>
                        <div>
                            {article.button}
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
            
        </div>
    )
}

export default Artical