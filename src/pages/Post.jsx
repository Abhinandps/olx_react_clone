import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { carBrands, indianStatesAndCities } from "../utils/data";
import { UserAuth } from "../context/AuthContext";
import { useFirebase } from "../context/FirebaseContext";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import SelectInput from "../components/Form/Select";
import { TitleCard } from "../components/Cards";
import { FileUpload } from "../components/Form/FileUpload";
import { InputField, TextArea } from "../components/Form/Input";

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
      return;
    }
    if (!brand) {
      onError("brand", "Please select a brand");
      return;
    }

    if (!year.trim()) {
      onError("year", "Year is required");
      return;
    }

    if (!kmDriven.trim()) {
      onError("kmDriven", "KM Driven is required");
      return;
    }

    if (!title.trim()) {
      onError("title", "Title is required");
      return;
    }

    if (!description.trim()) {
      onError("description", "Description is required");
      return;
    }

    if (!price.trim()) {
      onError("price", "Price is required");
      return;
    }
    if (photos === null) {
      onError("photos", "File is required");
      return;
    }

    if (!state) {
      onError("state", "Please select a state");
      return;
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

export default Post;
