import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { React, useState } from "react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      const body = new FormData();
      body.append("image", i);
    }
  };

  const handleFileChange = () => (e) => {
    const files = e.target.files[0];
  };

  const setPreviewImg = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const sendFileToServer = async (event) => {
    const body = new FormData();
    body.append("profile_pic", image);
    const res = await fetch("/api/upload_file", {
      method: "POST",
      body
    });

    const response = await res.json();
    console.log(response)
  };

  return (
    <>
      <div className={styles.container}>
        <form>
          <div className={styles.card2}>
            <img
              src={createObjectURL}
              height={100}
              width={100}
              className={styles.imgPreview}
            />
          </div>

          <div className={styles.card}>
            <h3>Upload Files In NextJS - CopyCode.org</h3>

            <div className={styles.drop_box}>
              <header>
                <h4>Select File here</h4>
              </header>

              <input
                type="file"
                id="fileID"
                className={styles.btn}
                onChange={setPreviewImg}
              />

              <button
                style={{ opacity: "1" }}
                className={styles.uploadBtn}
                onClick={(event)=>sendFileToServer(event)}
              >
                Upload Files
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
