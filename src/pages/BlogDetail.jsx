import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoader } from "../context/LoaderContext";
import { Helmet } from "react-helmet";

function BlogArchive() {
    const { startLoading, stopLoading } = useLoader();

    const [detail, setDetail] = useState({});
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    let { slug } = useParams()

    useEffect(() => {
        startLoading();
        const fetchDetail = async () => {
            try {
                const response = await fetch(`${baseUrl}blogs/${slug}`); // Example API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setDetail(data['data'])
            } catch (err) {
                console.error(err.message);
            } finally {
                stopLoading();
            }
        };

        fetchDetail();
    },
        []);


    return (
        <>
            {detail?.meta_title ?

                <Helmet>
                    <title>{detail?.meta_title || detail?.name} </title>
                    <meta
                        name="description"
                        content={detail?.meta_description || `${detail?.name}`}
                    />
                    <meta
                        name="keywords"
                        content={detail?.meta_keyword || detail?.name.split(" ").join(", ")}
                    />
                </Helmet> :
                <Helmet>
                    <title>{`${detail?.title} | Dawn Scientific`} </title>
                    <meta name="description" content={detail?.title} />
                    <meta name="keywords" content={`${detail?.title}, Dawn Scientific`} />
                    <meta property="og:title" content={detail?.title} />
                    <meta property="og:description" content={detail?.title} />
                    <meta property="og:type" content="post" />
                    <meta property="og:url" content={`https://dawnscientific.com/blog/detail/${detail?.slug}`} />
                    <meta property="og:image" content={detail?.image_url} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={detail?.title} />
                    <meta name="twitter:description" content={detail?.content || detail?.title} />
                    <meta name="twitter:image" content={detail?.image_url} />
                    <link rel="canonical" href={`https://dawnscientific.com/blog/detail/${detail?.slug}`} />
                </Helmet>
            }
            <section className="blog_detail">
                <div className="container">
                    <div className="row">
                        <div className="w_100">
                            <div className="text-center">
                                <NavLink className="blog_category dark" to='/blog'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" fill="currentColor" /></svg>
                                    Back
                                </NavLink>
                                <NavLink className="blog_category" to={`/blog/${detail?.categories?.[0]?.slug}`}>{detail?.categories?.[0]?.name}</NavLink>
                            </div>
                            <h1 className="text-center">{detail?.title}</h1>
                            <p className="timeline text-center">
                                On {detail?.created_at &&
                                    new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        weekday: "long",
                                    }).format(new Date(detail.created_at))}
                            </p>
                            <div className="text-center">
                                <div className="blog_thumbnail">
                                    <img src={detail?.image_url} alt="" />
                                </div>
                            </div>
                            <div className="desc">
                                <p dangerouslySetInnerHTML={{ __html: detail?.content }}></p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default BlogArchive;