import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Select, RTE, Input } from '../indexx';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function UseForm({ post }) {

    // we can continuosly watch the "form", set the value, control is used to connect with RTE,and also get the value of a form  
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });


    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);  // useSelector apko access deta j hha 
    const submit = async (data) => {
        console.log('=== FORM SUBMISSION DEBUG ===');
        console.log('Form data being submitted:', data);
        console.log('Content field value:', data.content);
        console.log('Content length:', data.content ? data.content.length : 'undefined/null');
        console.log('Title:', data.title);
        console.log('Slug:', data.slug);
        console.log('Status:', data.status);
        console.log('Image:', data.image);
        console.log('User data:', userData);
        console.log('=== END DEBUG ===');
        try {
            if (post) {
                const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                if (file) {
                    appwriteService.deleteFile(post.featuredimage);
                }
                const dbPost = await appwriteService.updatePost(
                    post.$id,
                    {
                        ...data,
                        featuredimage: file ? file.$id : undefined,
                    }
                );
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                if (file) {
                    const fileId = file.$id;
                    data.featuredimage = fileId;
                }
                const dbPost = await appwriteService.createPost({ ...data, userid: userData.$id });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Submit error:", error);
            // Optionally, set an error state and display it in the UI
        }
    }
    // we havew two things , title and slug , title ko watch krna ha , or slug main value generate krni ha
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-') // replace non-alphanumeric chars with dash
                .replace(/\s/g, '-');
        }
        return '';
    }, [])

        // interview question is from below ,useEffect is-->   how to optimize a method which is called inside from useEffect
        // so answer is , you just store the method in a variable , 
        // then return the variable .unsubscribe().    , 
        // ham aisa islie krte han taaki , method loop main kabhi fase to , baad main araam se return hojae, so it is an optimization

        useEffect(() => {
            // watch is comes from react-hook-form
            const subscription = watch((value, { name }) => {
                if (name === 'title') {
                    setValue('slug', slugTransform(value.title), { shouldValidate: true })
                }
            })

            return () => {
                subscription.unsubscribe()
            }
        }, [watch, slugTransform, setValue])



        return (                                      // page ke 2/3rd hisse main 2 input rakha ha ,baki 1/3rd main or dusron ko rakha ha 
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="w-2/3 px-2">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className="w-1/3 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image")}
                    />
                    {post && post.featuredimage
                        ? <img src={appwriteService.getFilePreview(post.featuredimage)} alt={post.title} />
                        : <div>No image</div>
                    }
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        );
    }

    export default UseForm