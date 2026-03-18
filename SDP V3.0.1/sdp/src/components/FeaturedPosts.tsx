import { useNavigate } from "react-router-dom";
import { SYSTEM_KEY } from "../config/Constent";

const FeaturedPosts = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Recording Appointment",
      description:
        "Book a professional recording session in our state-of-the-art studio with experienced sound engineers.",
      category: "Recording",
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      author: "Studio Team",
      date: "Available Daily",
      url: "/vocal-recoding-apoiment"
    },
    {
      id: 2,
      title: "Training Class",
      description:
        "Improve your musical skills with expert coaching in vocals and instrument classes like guitar and piano.",
      category: "Training",
      imageUrl:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      author: "Trainers",
      date: "Weekly Sessions",
      url: "/vocal-traning-class"
    },
  ];

  const handleServiceClick = (url: string) => {
    if(localStorage.getItem(SYSTEM_KEY.ACCESS_TOKEN)) {
    navigate(url);
    }else{
      navigate("/auth");
    }
  };


  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-16"  id="services">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition hover:shadow-lg"
            onClick={() => handleServiceClick(service.url)}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 h-full">
              {/* Image Section */}
              <div className="md:col-span-2 relative h-60 md:h-auto">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.imageUrl})` }}
                >
                  <span className="absolute top-3 left-3 bg-yellow-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="md:col-span-3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{service.description}</p>
                </div>
                <div className="mt-4 text-sm text-gray-500 flex flex-wrap gap-4">
                  <span className="flex items-center gap-1">
                    <i className="bi bi-person" />
                    {service.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="bi bi-calendar" />
                    {service.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default FeaturedPosts;
