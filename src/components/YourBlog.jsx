import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import SuccessToast from './Toast/SuccessToast';
import ErrorToast from './Toast/ErrorToast';
import Footer from './Footer';
import { motion } from "framer-motion";


const YourBlog = () => {

  const userData = useSelector((state) => state.user.user);

  const [posts, setPosts] = useState([]);
  const [data, setData] = useState();
  const [updateData, setUpdateData] = useState();
  const [updatedTitle, setUpdatedTitle] = useState();
  const [updatedDescription, setUpdatedDescription] = useState();
  const [loader, setLoader] = useState(false)
  const [id, setId] = useState();
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');


  const getUserPost = async () => {
    try {
      setLoader(true)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/post/getByUserId/${userData?.user === undefined ? userData?.id : userData?.user?.id}`,
        {
          withCredentials: true
        }
      )
      if (response.data.message && response.data) {
        setPosts(response.data.post);
        setLoader(false);
      }

      if (response.data.error) {
        setLoader(false);
        setError(response.data.error)
        setTimeout(() => {
          setError('')
        }, 2000)
      }
    } catch (error) {
      setLoader(false);
      setError(error)
      setTimeout(() => {
        setError('')
      }, 2000)
    }

  };

  const handleUpdate = async (id) => {
    setLoader(true);

    const data = {
      id: id,
      title: updatedTitle,
      description: updatedDescription
    }
    const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/post/update/${id}`, data, {
      withCredentials: true
    });

    console.log(response.data);
    if (response.data) {
      document.getElementById('my_modal_2').close();
      document.getElementById('my_modal_3').close();
      setToast(response.data.message);
      setTimeout(() => {
        setToast('')
      }, 2000)
      setUpdateData();
      setUpdatedTitle();
      setUpdatedDescription();
      getUserPost();
      setLoader(false);
    }

    if (response.error) {
      setError('Error occured while updating post..')
      setTimeout(() => {
        setError('')
      }, 2000)
      document.getElementById('my_modal_2').close();
      document.getElementById('my_modal_3').close();
      setUpdateData();
      setUpdatedTitle();
      setUpdatedDescription();
      getUserPost();
      setLoader(false);
    }

  }

  const handleDelete = async (id) => {
    setLoader(true)
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND}/api/post/${id}`, {
      withCredentials: true
    });
    if (response.data) {
      document.getElementById('my_modal_1').close();
      document.getElementById('my_modal_3').close();
      setToast('Blog deleted successfully.')
      setTimeout(() => {
        setToast('')
      }, 2000)
      setId();
      setLoader(false);
      getUserPost();
    }
  }

  useEffect(() => {
    getUserPost();
  }, []);



  return (
    <>
      <Navbar />
      {toast && <SuccessToast message={toast} />}
      {error && <ErrorToast message={error} />}
      <div className='min-h-screen bg-cover p-4 lg:pl-10 pt-20' style={{
        backgroundImage: `url(${'/BlogsBackground.png'})`,
      }}>
        <motion.div initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }} className='mt-14 bg-transparent w-full p-6 rounded-2xl cursor-pointer lg:space-y-8'>
          <h1 className='text-center text-xl lg:text-2xl text-[#42307D] font-serif'>Your Profile</h1>
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="w-40 lg:w-30 lg:order-2 lg:mt-0 mt-4">
              <img
                alt="Profile Pic"
                src={userData?.user === undefined ? userData?.pictureUrl : userData?.user?.pictureUrl}
                className='p-1 border-purple-600 border-3 rounded-full w-40 h-40 lg:h-30'
              />
            </div>
            <div className='flex flex-col justify-center lg:mt-0 mt-10 space-y-2 lg:text-xl text-[#42307D]'>
              <p><span className='font-bold'>Name</span> :- {userData?.user === undefined ? userData?.name : userData?.user?.name}</p>
              <p><span className='font-bold'>Email</span> :- {userData?.user === undefined ? userData?.email : userData?.user?.email}</p>
            </div>
          </div>
        </motion.div>

        <h1 className='text-2xl lg:text-5xl text-center mt-20 text-[#42307D]'>Blogs Posted by You !!</h1>

        <div className={`mt-10 lg:mt-20 lg:px-10 ${loader || posts?.length == 0 ? `flex justify-center items-center` : `grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6`} mb-10`}>
          {
            posts?.length > 0 ? posts.map((post, index) => (
              <div key={post.id} className="bg-[#F9F5FF] shadow-lg rounded-md hover:shadow-2xl border border-gray-400 px-4 cursor-pointer pb-4">
                <img className="w-full h-48 object-cover mt-4 border border-gray-300" src={post.imageUrl} alt='' onClick={() => { document.getElementById('my_modal_3').showModal(), setData(post) }} />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-[#42307D]" onClick={() => { document.getElementById('my_modal_3').showModal(), setData(post) }}>{post.title}</h2>
                  <p className="text-gray-600 mt-2 text-sm text-wrap h-56 md:h-30 lg:h-56" onClick={() => { document.getElementById('my_modal_3').showModal(), setData(post) }}>{post.description.slice(0, 400)}<span className='text-blue-500 underline'> read more</span></p>
                  <div className="flex flex-row justify-between">
                    <div className="mt-4 flex flex-col text-sm text-gray-500">
                      <span><span className='text-[#42307D] font-medium'>Created At :-</span><span className="font-medium text-gray-700">{new Date(post.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      })}</span></span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button><FaRegEdit size={22} className='text-blue-500 hover:text-blue-600 cursor-pointer' onClick={() => { document.getElementById('my_modal_2').showModal(), setUpdateData(post), setUpdatedTitle(post.title), setUpdatedDescription(post.description) }} /></button>
                      <button><RiDeleteBin6Line size={22} className="text-red-500 hover:text-red-600 cursor-pointer" onClick={() => { document.getElementById('my_modal_1').showModal(), setId(post.id) }} /></button>
                    </div>
                  </div>
                </div>
              </div>


            )) : (
              loader ?
                <span className="static loading loading-dots loading-xl"></span>
                :
                <div className='static pb-10 mt-4'>
                  <div className="flex flex-col justify-center items-center">
                    <img src="/NoPost.jpg" alt="" className='lg:w-100 w-50' />
                    <h1 className='lg:text-3xl text-xl'>No blog uploaded by You.</h1>
                  </div>
                </div>

            )
          }
        </div>

        {/* Details Modal */}
        <dialog id='my_modal_3' className='fixed top-35 md:top-30 lg:top-20 left-10 md:left-1/6 lg:left-1/3 rounded-4xl px-10'>
          <div className='flex flex-row justify-center w-[240px] md:w-[460px] lg:w-[500px] h-[540px] lg:h-[570px] bg-white rounded-4xl px-5 mb-4 lg:mb-0'>
            <div className='flex flex-col mt-10 lg:mt-16 space-y-6 lg:mx-0 mx-6'>
              <LuPencil size={20} onClick={() => { document.getElementById('my_modal_2').showModal(), setUpdateData(data), setUpdatedTitle(data?.title), setUpdatedDescription(data?.description) }} className='absolute top-10 lg:top-12 right-4 lg:right-10 cursor-pointer' />
              <div className='flex flex-row justify-between'>
                <h1 className='lg:text-xl text-lg text-[#42307D] text-wrap font-bold'>{data?.title}</h1>
              </div>
              <div className='flex flex-col justify-center items-center space-y-4'>
                <div className='flex'>
                  <img className='h-40' src={data?.imageUrl} alt="" />
                </div>
                <div className='flex max-h-40 overflow-y-auto'>
                  <p className='text-sm text-gray-500'>{data?.description}</p>
                </div>
                <button className='w-60 h-8 lg:w-72 rounded-lg text-white bg-[#EB4335] mt-6 mb-4 lg:mb-4 cursor-pointer' onClick={() => { document.getElementById('my_modal_1').showModal(), setId(data?.id) }}>Delete</button>
              </div>
            </div>

          </div>
          <form method='dialog'>
            <button className="absolute top-8 lg:top-5 left-4 lg:left-2 text-gray-400 hover:text-gray-600 text-2xl font-bold lg:m-4 cursor-pointer" onClick={() => { setData() }}>
              &times;
            </button>
          </form>
        </dialog>

        {/* Update Modal */}
        <dialog id='my_modal_2' className='fixed top-45 lg:top-20 left-10 md:left-2/8 lg:left-1/3 rounded-4xl px-10 md:px-0 lg:px-10 pb-4'>
          <div className='flex flex-row justify-center w-[240px] md:w-[360px] lg:w-[500px] h-[540px] lg:h-[580px] bg-white rounded-4xl px-5'>
            <div className='flex flex-col mt-10 lg:mt-16 space-y-6 lg:mx-0 mx-6 w-full'>
              <h1 className='lg:text-3xl text-2xl text-[#42307D] text-center pt-2 font-bold'>Update Post</h1>
              <div className='flex flex-col justify-center items-center space-y-4'>
                <div className='flex'>
                  <img className='h-40' src={updateData?.imageUrl} alt="" />
                </div>
                <label className='floating-label lg:w-full w-60'>
                  <span>Title</span>
                  <input
                    type="text"
                    placeholder="Title"
                    className="input input-md w-full"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                </label>
                <label className='floating-label lg:w-full w-60'>
                  <span>Description</span>
                  <textarea
                    className="textarea lg:w-full w-60 h-30 lg:text-md text-sm"
                    placeholder="Description"
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                </label>
                <button className='w-60 h-10 lg:w-full rounded-lg bg-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-800 text-white mt-6 mb-4 lg:mb-0 cursor-pointer' onClick={() => handleUpdate(updateData.id)}>{loader ? <span className="loading loading-spinner loading-md" /> : `Update`}</button>
              </div>
            </div>

          </div>
          <form method='dialog'>
            <button className="absolute top-6 lg:top-5 left-5 md:left-10 lg:left-2 text-gray-400 hover:text-gray-600 text-2xl font-bold lg:m-4 cursor-pointer" onClick={() => { setData(), setUpdatedTitle(), setUpdatedDescription(), document.getElementById('my_modal_3').close() }}>
              &times;
            </button>
          </form>
        </dialog>

        {/* Delete Modal */}
        <dialog id='my_modal_1' className='fixed top-70 left-15 md:left-1/6 lg:left-2/5 rounded-4xl px-10'>
          <div className='flex flex-row justify-center w-[180px] md:w-[260px] lg:w-[250px] h-[180px] lg:h-[220px] bg-white rounded-4xl px-5'>
            <div className='flex flex-col mt-10 lg:mt-10 space-y-6 lg:mx-0 mx-6 w-full'>
              <div className='flex flex-col justify-center items-center lg:space-y-3'>
                <p className='text-xl lg:text-3xl text-center text-wrap font-light'>Do you want to delete Post ?</p>
                <div className='flex justify-between space-x-4'>
                  <button className='h-10 w-20 rounded-lg text-[#272643] border hover:bg-base-300 border-[#272643] mt-6 mb-4 lg:mb-0 cursor-pointer' onClick={() => { document.getElementById('my_modal_1').close(), setId() }}>Cancel</button>
                  <button className=' h-10 w-20 rounded-lg text-white bg-red-600 hover:bg-rose-700 mt-6 mb-4 lg:mb-0 cursor-pointer' onClick={() => handleDelete(id)}>{loader ? <span className="loading loading-spinner loading-md" /> : `Delete`}</button>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </div>
      <Footer />
    </>
  )
}

export default YourBlog
