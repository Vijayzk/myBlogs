import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import Footer from './Footer';
import { motion } from "framer-motion";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState();
  const [searchText, setSearchText] = useState('');
  const [loader, setLoader] = useState(false);
  const [postLoader, setPostLoader] = useState(false);

  const getPosts = async () => {
    setPostLoader(true)
    const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/post/`, {
      withCredentials: true
    });
    if (response.data.posts) {
      setPosts(response.data.posts)
      setPostLoader(false);
    }

  };


  const handleSearch = async (e) => {
    e.preventDefault();
    setLoader(true)
    if (!searchText) {
      setLoader(false)
      getPosts();
      return;
    }

    const data = {
      name: searchText
    }

    const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/post/search`, data, {
      withCredentials: true
    })
    setPosts(response.data.post);
    setLoader(false);
  }


  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-cover p-4 lg:pl-10 pt-14 scroll-smooth' style={{
        backgroundImage: `url(${'/BlogsBackground.png'})`,
      }}>
        <div className='flex flex-col justify-center items-center'>
          <motion.div initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }} 
            className='flex flex-col items-center space-y-2'  
          >
          <h1 className='text-center text-[#42307D] mt-10 text-3xl lg:text-5xl'>All your posted blogs are shown here !!</h1>
          <p className='text-center  mt-8 lg:w-1/2 text-gray-600'>Ready to inspire, inform, or entertain? Write your thoughts, stories, or expertise and connect with readers across the globe. Whether it's a personal experience or a professional insight, your blog starts here.</p>
        </motion.div>
        <form className='flex flex-row justify-center items-center mt-8 space-x-4' onSubmit={handleSearch}>
          <label className="input lg:input-md input-sm w-60 lg:w-88">
            <FaSearch size={14} />
            <input type="text" placeholder="Search for blog" className="outline-none" value={searchText} onChange={e => setSearchText(e.target.value)} />
          </label>
          <button className='btn lg:btn-md btn-sm w-1/4 lg:w-1/4 rounded-md bg-black hover:text-gray-200 text-white'>{loader ? <span className="loading loading-spinner loading-md" /> : `Search`}</button>
        </form>
      </div>


      <div className={`mt-10 lg:mt-20 lg:px-10 ${postLoader || posts?.length == 0 ? `flex justify-center items-center` : `grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6`} lg:mb-10 scroll-smooth`}>
        {
          posts.length > 0 ? posts.map((post, index) => (

            <div key={post.id} className="bg-[#F9F5FF] shadow-lg rounded-md hover:shadow-2xl border border-gray-400 px-4 cursor-pointer pb-4" onClick={() => { document.getElementById('my_modal_3').showModal(), setData(post) }}>
              <img className="w-full h-48 object-cover mt-4 border border-gray-300" src={post.imageUrl} alt='Post Image' />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#42307D]">{post.title}</h2>
                <p className="text-gray-600 mt-2 text-sm text-wrap h-56 md:h-30 lg:h-56">{post.description.slice(0, 400)}<span className='text-[#42307D] underline'> read more</span></p>
                <div className="flex flex-row justify-between">
                  <div className="mt-4 flex flex-col text-sm text-gray-500">
                    <span><span className='text-[#42307D] font-medium'>Created At :-</span><span className="font-medium text-gray-700">{new Date(post.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    })}</span></span>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            postLoader ?
              <span className="static loading loading-dots loading-xl"></span>
              :
              <div className='static mt-4'>
                <div className="flex flex-col justify-center items-center space-y-2">
                  <img src="/NoPost.jpg" alt="" className='lg:w-100 w-50' />
                  <h1 className='lg:text-3xl text-xl'>No blogs found.</h1>
                </div>
              </div>
          )
        }

        {/* Blog Details */}
        <dialog id='my_modal_3' className='fixed top-30 left-5 md:left-1/6 lg:top-20 lg:left-1/3 rounded-4xl px-4 lg:px-10'>
          <div className='flex flex-row justify-center w-[260px] h-[380px] md:w-[420px] lg:w-[500px] lg:h-[460px] bg-white rounded-4xl px-2 md:px-5 mb-5 lg:mb-14 pt-10 lg:pt-0'>
            <div className='flex flex-col lg:mt-16 space-y-6 lg:mx-0 mx-6'>
              <div className='flex flex-row justify-between'>
                <h1 className='lg:text-2xl text-lg text-[#42307D] font-bold'>{data?.title}</h1>
              </div>
              <div className='flex flex-col justify-center items-center space-y-4'>
                <div className='flex'>
                  <img className='h-40' src={data?.imageUrl} alt="" />
                </div>
                <div className='flex max-h-40 overflow-y-auto'>
                  <p className='text-sm text-gray-500'>{data?.description}</p>
                </div>
              </div>
            </div>

          </div>
          <form method='dialog'>
            <button className="absolute top-4 left-5 md:left-5 md:top-5 lg:top-2 lg:left-2 lg:text-2xl text-gray-400 hover:text-gray-600 text-2xl font-bold lg:m-4 cursor-pointer" onClick={() => { setData() }}>
              &times;
            </button>
          </form>
        </dialog>
      </div>
    </div >
      <Footer />
    </>
  )
}

export default Blogs
