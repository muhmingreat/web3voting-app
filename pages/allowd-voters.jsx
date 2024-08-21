import React, { useState, useEffect, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import { VotingContext } from "../context/Voter";
import styles from "./allowedVoter.module.css";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Image from "next/image";
import image from "../assets";

const AllowVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });

  const router = useRouter();
  const { uploadToIpfs, createVoter } = useContext(VotingContext);

  // .........VOTER IMAGE DROP
  const onDrop = useCallback(async (acceptedFil) => {
    const url = await uploadToIpfs(acceptedFil[0]);
    setFileUrl(url);
    console.log(url);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });
  return (
    <div className={styles.createVoter}>
      <div>
        {fileUrl && (
          <div className={styles.voterInfo}>
            <div className={styles.voterInfo_paragraph}>
              <img src={fileUrl} alt="voter-image" />
              <p className="">
                Name: <span>&nbps;{formInput.name}</span>
              </p>
              <p>
                Address:<span>&nbps;{formInput.address.slice(0, 20)}</span>
              </p>
              <p>
                Position:&nbps;<span>{formInput.position}</span>
              </p>
            </div>
          </div>
        )}
        {!fileUrl && (
          <div className={styles.sideInfo}>
            <div className={styles.sideInfo_box}>
              <h4> Create Candidate for Voting</h4>
              <p> Blockchain voting organisation</p>
              <p className={styles.sideInfo_para}>Contract Candidate List</p>
            </div>
            <div className={styles.card}>
              {/* {voterArray.map((el,i) => ( */}
              <div className={styles.card_box}>
                <div className={styles.image}>
                  <Image src="/assets/creator1.png" alt=""
                  width={200} height={200} />
                </div>
                <div className={styles.card_info}>
                  <p> Name</p>
                  <p> Adress</p>
                  <p> Details</p>
                </div>
              </div>
              {/* ))} */}
            </div>
          </div>
        )}
      </div>
      <div className={styles.voter}>
        <div className={styles.voter_container}>
          <h1>Create new voter</h1>
          <div className={styles.voter_container_box}>
            <div className={styles.voter_container_box_div}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={styles.voter_container_box_div_info}>
                  <p>Upload file: JPG, PNG, GIF, WEBM Max 10Mb</p>
                  <div className={styles.voter_container_div_box_image}>
                    <img
                      src='candidate-1.jpg'
                      alt=""
                      heigth={150}
                      width={150}
                      objectfit="contain"
                    />
                  </div>
                  <p>Drag & Drop File</p>
                  <p>or Browse on you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.input_container}>
          <Input
            inputType="text"
            title="Name"
            placeholder="Voter Name"
            handleClick={(e) =>
              setFormInput({ ...formInput, name: e.target.value })
            }
          />

          <Input
            inputType="text"
            title="Address"
            placeholder="Voter Address"
            handleClick={(e) =>
              setFormInput({ ...formInput, address: e.target.value })
            }
          />

          <Input
            inputType="text"
            title="Position"
            placeholder="Voter Position"
            handleClick={(e) =>
              setFormInput({ ...formInput, position: e.target.value })
            }
          />

          <div className={styles.Button}>
            <Button
              btnname="Authorized Voter"
              handleClick={() => createVoter(formInput, fileUrl, router)}
            />
          </div>
        </div>
      </div>
      <div className={styles.createdVoter}>
        <div className={styles.createVoter_info}>
          <img src={image.creator} alt="" />
          <p>
            Organizer <span>0x7yut9......</span>
          </p>
          <p>
            Only organizer of the voting contract can create voter for votin
            election
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllowVoters;
