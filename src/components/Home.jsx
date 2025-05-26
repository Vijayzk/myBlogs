import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Footer from './Footer';
import { motion } from "framer-motion";
import { useState } from 'react';



const Home = () => {

    const user = useSelector((state) => state.user.user);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <Navbar />
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="w-full h-screen"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div
                        className="hero min-h-screen"
                        style={
                            {
                                backgroundImage: `linear-gradient(to right, #a855f7 1px, transparent 1px),linear-gradient(to bottom, #a855f7 1px, transparent 1px)`,
                                backgroundSize: '100px 100px'
                            }
                        }
                    >

                        {activeIndex === 0 ?
                            (<motion.div initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeOut"
                                }} className="flex flex-col space-y-4 lg:space-y-8 justify-center items-center text-center text-[#42307D] mt-20 px-10">
                                <h1 className="text-2xl lg:text-5xl">
                                    Start posting. Inspire the world, one blog at a time.
                                </h1>
                                <p className="text-gray-700 text-sm lg:text-lg max-w-4xl">
                                    Whether it's personal insights, expert knowledge, or passionate opinions, blogging is your space to be heard. Start writing today and let your words make an impact.Blogging is more than writing—it’s about building connections, sparking ideas, and inspiring others. Join a community of creators and turn your thoughts into something powerful. Your blog could be the spark someone needs.You don’t need to be a professional writer to start a blog. You just need a voice and something to say. Create your own corner of the internet, grow your audience, and let your passion speak louder than ever.
                                </p>
                                <Link
                                    className="btn bg-purple-700 hover:bg-purple-800 text-white w-40"
                                    to={user ? "/postblog" : "/signup"}
                                >
                                    Start Posting
                                </Link>
                            </motion.div>) :
                            <div className="flex flex-col space-y-4 lg:space-y-8 justify-center items-center text-center text-[#42307D] mt-20 px-10">
                                <h1 className="text-2xl lg:text-5xl">
                                    Start posting. Inspire the world, one blog at a time.
                                </h1>
                                <p className="text-gray-700 text-sm lg:text-lg max-w-4xl">
                                    Whether it's personal insights, expert knowledge, or passionate opinions, blogging is your space to be heard. Start writing today and let your words make an impact.Blogging is more than writing—it’s about building connections, sparking ideas, and inspiring others. Join a community of creators and turn your thoughts into something powerful. Your blog could be the spark someone needs.You don’t need to be a professional writer to start a blog. You just need a voice and something to say. Create your own corner of the internet, grow your audience, and let your passion speak louder than ever.
                                </p>
                                <Link
                                    className="btn bg-purple-700 hover:bg-purple-800 text-white w-40"
                                    to={user ? "/postblog" : "/signup"}
                                >
                                    Start Posting
                                </Link>
                            </div>
                        }
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div
                        className="hero min-h-screen"
                        style={
                            {
                                backgroundImage: `linear-gradient(to right, #a855f7 1px, transparent 1px),linear-gradient(to bottom, #a855f7 1px, transparent 1px)`,
                                backgroundSize: '100px 100px'
                            }
                        }
                    >
                        {activeIndex === 1 ? <motion.div initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut"
                            }} className="flex flex-col space-y-4 lg:space-y-8 justify-center items-center text-center text-[#42307D] mt-20 px-10">
                            <h1 className="text-2xl lg:text-5xl">Create. Post. Influence.</h1>
                            <p className="text-gray-800 text-sm lg:text-lg max-w-4xl">
                                Blogging is more than writing—it’s about building connections, sparking ideas, and inspiring others. Join a community of creators and turn your thoughts into something powerful. Your blog could be the spark someone needs.Everyone has a story to tell—what’s yours? Whether it's personal insights, expert knowledge, or passionate opinions, blogging is your space to be heard.You don’t need to be a professional writer to start a blog. You just need a voice and something to say. Create your own corner of the internet, grow your audience, and let your passion speak louder than ever
                            </p>
                            <Link
                                className="btn bg-purple-700 hover:bg-purple-800 text-white w-40"
                                to={user ? "/postblog" : "/signup"}
                            >
                                Start Posting
                            </Link>
                        </motion.div> :
                            <div className="flex flex-col space-y-4 lg:space-y-8 justify-center items-center text-center text-[#42307D] mt-20 px-10">
                                <h1 className="text-2xl lg:text-5xl">Create. Post. Influence.</h1>
                                <p className="text-gray-800 text-sm lg:text-lg max-w-4xl">
                                    Blogging is more than writing—it’s about building connections, sparking ideas, and inspiring others. Join a community of creators and turn your thoughts into something powerful. Your blog could be the spark someone needs.Everyone has a story to tell—what’s yours? Whether it's personal insights, expert knowledge, or passionate opinions, blogging is your space to be heard.You don’t need to be a professional writer to start a blog. You just need a voice and something to say. Create your own corner of the internet, grow your audience, and let your passion speak louder than ever
                                </p>
                                <Link
                                    className="btn bg-purple-700 hover:bg-purple-800 text-white w-40"
                                    to={user ? "/postblog" : "/signup"}
                                >
                                    Start Posting
                                </Link>
                            </div>
                        }
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div
                        className="hero min-h-screen"
                        style={
                            {
                                backgroundImage: `linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)`,
                                backgroundSize: '100px 100px'
                            }
                        }
                    >
                        {activeIndex === 2 ?
                            <motion.div initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeOut"
                                }} className="flex flex-col space-y-4 lg:space-y-8 justify-center items-center text-center text-[#42307D] mt-20 px-10">
                                <h1 className="text-2xl lg:text-5xl">Got something to share? Start your blog now!</h1>
                                <p className="text-gray-800 text-sm lg:text-lg max-w-4xl">
                                    You don’t need to be a professional writer to start a blog. You just need a voice and something to say. Create your own corner of the internet, grow your audience, and let your passion speak louder than ever.Blogging is more than writing—it’s about building connections, sparking ideas, and inspiring others.Blogging is more than writing—it’s about building connections, sparking ideas, and inspiring others. Join a community of creators and turn your thoughts into something powerful.
                                </p>
                                <Link
                                    className="btn bg-purple-700 hover:bg-purple-800 text-white w-40"
                                    to={user ? "/postblog" : "/signup"}
                                >
                                    Start Posting
                                </Link>
                            </motion.div>
                            : <div className="flex flex-col space-y-4 lg:space-y-8 justify-center items-center text-center text-[#42307D] mt-20 px-10">
                                <h2 className="text-2xl lg:text-5xl">Got something to share? Start your blog now!</h2>
                                <p className="text-gray-800 text-sm lg:text-lg max-w-4xl">
                                    You don’t need to be a professional writer to start a blog. You just need a voice and something to say. Create your own corner of the internet, grow your audience, and let your passion speak louder than ever.Blogging is more than writing—it’s about building connections, sparking ideas, and inspiring others.Blogging is more than writing—it’s about building connections, sparking ideas, and inspiring others. Join a community of creators and turn your thoughts into something powerful.
                                </p>
                                <Link
                                    className="btn bg-purple-700 hover:bg-purple-800 text-white w-40"
                                    to={user ? "/postblog" : "/signup"}
                                >
                                    Start Posting
                                </Link>
                            </div>
                        }
                    </div>
                </SwiperSlide>
            </Swiper >
            <Footer />
        </>
    )
}

export default Home
