"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface SearchParams {
    box_count: string;
    captions: string;
    height: string;
    id: string;
    name: string;
    url: string;
    width: string;
}

interface SingleMemeProps {
    searchParams: SearchParams;
}

const SingleMeme: React.FC<SingleMemeProps> = ({ searchParams }) => {
    const [inputValues, setInputValues] = useState<string[]>(Array(parseInt(searchParams.box_count, 10)).fill('')); 
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Track loading state

    // Handle input change
    const handleInputChange = (index: number, value: string) => {
        const newValues = [...inputValues];
        newValues[index] = value;
        setInputValues(newValues);
    };

    const generateImage = async () => {
        if (inputValues.some(value => value.trim() === '')) {
            setErrorMessage("All fields must be filled.");
            return;
        }
    
        const textParams = inputValues.map((value, index) => `&text${index}=${encodeURIComponent(value)}`).join('');
        console.log(textParams);

        setLoading(true); 
    
        try {
            const response = await fetch(`https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=huzii_ahmed&password=cQvxN7un$*7it-e${textParams}`, {
                method: 'POST',
            });
            const data = await response.json();
    
            if (data.success) {
                const imageUrl = data.data.url;
    
                Swal.fire({
                    title: 'Image Generated!',
                    html: `
                        <Image src="${imageUrl}" alt="Generated Image" style="width: 100%; max-width: 400px;"/>
                        <a href="${imageUrl}" download="generated-image.png" style="display: inline-block; margin-top: 10px; text-decoration: none; background-color: #3085d6; color: white; padding: 10px; border-radius: 5px;">Download</a>
                    `,
                    confirmButtonText: 'OK',
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to generate image.',
                    icon: 'error',
                });
            }
            
        } catch (error) {
            console.error("Error generating image:", error);
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while generating the image.',
                icon: 'error',
            });
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex-shrink-0 w-1/2">
                    <Image
                        src={searchParams.url}
                        alt={searchParams.name}
                        className="object-cover w-full h-full"
                        width={parseInt(searchParams.width)}
                        height={parseInt(searchParams.height)}
                    />
                </div>
                <div className="flex-1 p-6">
                    <h2 className="text-2xl font-bold mb-4">Enter Meme Text</h2>

                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                    {inputValues.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder={`Text ${index + 1}`}
                            value={value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                        />
                    ))}

                    <button
                        onClick={generateImage}
                        disabled={loading} 
                        className={`w-full p-2 text-white rounded transition duration-200 ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleMeme;
