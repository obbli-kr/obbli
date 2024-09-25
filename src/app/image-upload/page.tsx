'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

export default function Page() {
  const [resource, setResource] = useState();
  return (
    <>
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(result, { widget }) => {
        setResource(result?.info); // { public_id, secure_url, etc }
        console.log(result?.info);
        console.log(resource);
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          open();
        }
        return (
          <button onClick={handleOnClick}>
            {'Upload an Image'}
          </button>
        );
      }}
    </CldUploadWidget>
    <img src={resource?.secure_url} alt="Uploaded Image" />
    </>
  );
}