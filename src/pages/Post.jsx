import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { carBrands, indianStatesAndCities } from "../components/utils/data";
import { UserAuth } from "../context/AuthContext";
import { useFirebase } from "../context/FirebaseContext";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const defaultFormData = {
  brand: "",
  year: "",
  kmDriven: "",
  title: "",
  description: "",
  price: "",
  photos: null,
  state: "",
  city: "",
};

const Post = () => {
  const { user } = UserAuth();

  const { uploadPhotos } = useFirebase();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(defaultFormData);

  const [errorData, setErrorData] = useState(defaultFormData);

  const [cityList, setCityList] = useState([]);

  console.log(user);

  const {
    brand,
    year,
    kmDriven,
    title,
    description,
    price,
    photos,
    state,
    city,
  } = formData;

  useEffect(() => {
    onChange("city", "");
    if (state) {
      setCityList(
        indianStatesAndCities.find((item) => item?.state == state)?.cities
      );
    } else {
      setCityList([]);
    }
  }, [state]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrorData(defaultFormData);

    if (!brand) {
      onError("brand", "Please select a brand");
    }
    if (!brand) {
      onError("brand", "Please select a brand");
    }

    if (!year.trim()) {
      onError("year", "Year is required");
    }

    if (!kmDriven.trim()) {
      onError("kmDriven", "KM Driven is required");
    }

    if (!title.trim()) {
      onError("title", "Title is required");
    }

    if (!description.trim()) {
      onError("description", "Description is required");
    }

    if (!price.trim()) {
      onError("price", "Price is required");
    }
    if (photos === null) {
      onError("photos", "File is required");
    }

    if (!state) {
      onError("state", "Please select a state");
    }
    if (!city) {
      onError("city", "Please select a city");
      return;
    }

    const photoUrls = await uploadPhotos(user, photos);
    const updatedFormData = {
      ...formData,
      photos: photoUrls,
      highlight: false,
      userId: user.uid,
      createdAt: new Date().toDateString(),
    };

    const productsCollectionRef = collection(db, "products");
    await addDoc(productsCollectionRef, updatedFormData);
    navigate("/");
  };

  const onChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const onError = (key, value) => {
    setErrorData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div>
        <h2 className="text-center text-2xl font-bold py-3 text-teal-950">
          POST YOUR AD
        </h2>
      </div>
      <div className="border border-teal-950/20 rounded-sm max-w-[700px] mx-auto px-8 py-4">
        <div className="my-2">
          <TitleCard title="Default Category" />
          <span className="text-xs text-slate-500">OLX Autos (Cars)</span>
        </div>

        <form onSubmit={handleOnSubmit} action="">
          <TitleCard title="INCLUDE SOME DETAILS" />
          <SelectInput
            value={brand}
            label="Brand"
            onChange={(v) => onChange("brand", v)}
            options={carBrands}
            error={errorData.brand}
          />
          <InputField
            value={year}
            label="Year"
            type="number"
            onChange={(v) => onChange("year", v)}
            error={errorData.year}
          />
          <InputField
            value={kmDriven}
            label="KM driven"
            type="number"
            onChange={(v) => onChange("kmDriven", v)}
            error={errorData.kmDriven}
          />
          <InputField
            value={title}
            label="Add Title"
            onChange={(v) => onChange("title", v)}
            error={errorData.title}
          />

          <TextArea
            value={description}
            label="Description"
            onChange={(v) => onChange("description", v)}
            error={errorData.description}
          />

          <TitleCard title="SET A PRICE" />
          <InputField
            value={price}
            label="Price"
            type="number"
            onChange={(v) => onChange("price", v)}
            error={errorData.price}
          />

          <TitleCard title=" UPLOAD UP TO 5 PHOTOS" />
          <FileUpload
            value={photos}
            error={errorData.photos}
            onChange={(v) => onChange("photos", v)}
          />

          <TitleCard title="CONFIRM YOUR LOCATION" />

          <SelectInput
            value={state}
            label="State"
            options={indianStatesAndCities}
            onChange={(v) => onChange("state", v)}
            error={errorData.state}
          />

          <SelectInput
            label="City"
            value={city}
            onChange={(v) => onChange("city", v)}
            options={cityList}
            error={errorData.city}
          />

          <button className="bg-teal-950 text-white font-bold text-m px-4 py-2 rounded">
            Post Now
          </button>
        </form>
      </div>
    </>
  );
};

const Navbar = () => {
  return (
    <>
      <div className="bg-slate-100 h-[70px]">
        <div className="wrapper flex h-full justify-between items-center px-8">
          <Link to="/">
            <IoMdArrowBack size={24} />
          </Link>
        </div>
      </div>
    </>
  );
};

const TitleCard = ({ title }) => {
  return (
    <h2 className="text-lg font-bold uppercase pt-4 text-teal-950">{title}</h2>
  );
};

const InputField = ({ label, type = "text", onChange, value, error }) => {
  return (
    <div className="w-[350px] my-5 flex flex-col">
      <label className="text-base mb-1">
        {label} <span className="text-red-500">* </span>
      </label>
      <input
        value={value}
        type={type}
        className={`border ${
          error && " border-2 border-red-500"
        } focus:border-2 focus:border-teal-500 border-teal-950 rounded-sm  text-lg outline-none  py-3 px-3`}
        onChange={(e) => onChange && onChange(e.target.value)}
      />

      <div className="text-red-500 mt-2 font-bold text-sm">{error}</div>
    </div>
  );
};

const SelectInput = ({ label, options = [], value, onChange, error }) => {
  return (
    <div className="w-[350px] my-5 flex flex-col">
      <label className="text-base mb-1">
        {label} <span className="text-red-500">* </span>
      </label>

      <select
        className={`border ${
          error && " border-2 border-red-500"
        } focus:border-2 focus:border-teal-500 border-teal-950 rounded-sm  text-lg outline-none  py-3 px-3`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option></option>

        {options &&
          options.map((data, index) => (
            <option
              value={data.name ? data.name : data.state ? data.state : data}
              key={index}
            >
              {data.name ? data.name : data.state ? data.state : data}
            </option>
          ))}
      </select>
      <div className="text-red-500 mt-2 font-bold text-sm">{error}</div>
    </div>
  );
};

const TextArea = ({ label, value, onChange, error }) => {
  return (
    <>
      <div className="w-[350px] my-5 flex flex-col">
        <label className="text-base mb-1">
          {label} <span className="text-red-500">* </span>
        </label>
        <textarea
          onChange={(e) => onChange(e.target.value)}
          value={value}
          className={`border ${
            error && " border-2 border-red-500"
          } focus:border-2 focus:border-teal-500 border-teal-950 rounded-sm  text-lg outline-none  py-3 px-3`}
        ></textarea>
      </div>
      <div className="text-red-500 mt-2 font-bold text-sm">{error}</div>
    </>
  );
};

const FileUpload = ({ value, onChange, error }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (files.length === 0) return;
    uploadFiles();
  }, [files]);

  useEffect(() => {
    if (!value) setFiles([]);
  }, [value]);

  const uploadFiles = async () => {
    const formData = [];

    files.forEach((file) => {
      formData.push(file);
    });

    onChange(formData);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  return (
    <>
      <div className="flex gap-3">
        {files.map((file, i) => {
          return (
            <img
              key={i}
              className="w-24"
              src={file ? URL.createObjectURL(file) : ""}
              alt=""
            />
          );
        })}
      </div>

      <div className="w-[350px] my-5 flex flex-col">
        <input
          onChange={handleFileChange}
          type="file"
          className="text-lg outline-none  py-3 "
          multiple
        ></input>
      </div>

      <div className="text-red-500 mt-2 font-bold text-sm">{error}</div>
    </>
  );
};

export default Post;
