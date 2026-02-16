import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";


const ContactUs = () => {
  const serviceCenter = useLoaderData() || [];
  const position = [23.8103, 90.4125];
  const mapRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will get back to you soon.");
    e.target.reset();
  };

  const handlesearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;

    const districData = serviceCenter.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase()),
    );

    if (districData) {
      const coord = [districData.latitude, districData.longitude];
      mapRef.current.flyTo(coord, 14, {
        animate: true,
        duration: 2,
      });
    } else {
      alert("We don't have a service center in this district yet.");
    }
  };

  return (
    <div className="bg-base-200 min-h-screen">
      {/* Header Section */}
      <div className="bg-blue-900 text-white py-16 text-center">
        <h1 className="text-5xl font-bold">Contact Us</h1>
        <p className="mt-4 text-lg opacity-80">
          Have an issue or query? We are here to help!
        </p>
      </div>

      <div className="container mx-auto px-5 py-12 -mt-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card bg-base-100 shadow-xl p-8 border-t-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Get in Touch
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Our Location</h4>
                    <p className="text-gray-600 text-sm">
                      123 City Hall Plaza, Metropolitan Area, Dhaka 1200
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Phone Number</h4>
                    <p className="text-gray-600 text-sm">+880 1234 567 890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Your Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Your Email
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Message</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    placeholder="Describe your query..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary bg-blue-700 border-none w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Search Section */}
        <div className="mt-12 mb-6 max-w-md mx-auto">
          <form onSubmit={handlesearch} className="relative">
            <input
              type="search"
              className="input input-bordered w-full pr-10 focus:outline-blue-600 shadow-lg"
              placeholder="Search by District (e.g. Dhaka, Rangpur)"
              name="location"
            />
            <button type="submit" className="absolute right-3 top-3 opacity-50">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
          </form>
        </div>

        {/* Leaflet Map Container */}
        <div className="rounded-3xl overflow-hidden shadow-2xl h-125 border-8 border-white">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {serviceCenter.map((center, i) => (
              <Marker key={i} position={[center.latitude, center.longitude]}>
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-blue-800 text-lg">
                      {center.district}
                    </h3>
                    <p className="text-sm">
                      <strong>Coverage:</strong>{" "}
                      {center.covered_area.join(", ")}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
