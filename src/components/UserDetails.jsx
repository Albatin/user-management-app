import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const localUser = location.state?.user;

  const [user, setUser] = React.useState(localUser || null);
  const [loading, setLoading] = React.useState(!localUser);

  React.useEffect(() => {
    if (!localUser) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [id, localUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">User not found</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-4">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white break-words">
              {user.name}
            </h1>
            <p className="text-blue-100 mt-1 sm:mt-2 text-sm sm:text-base break-words">
              {user.email}
            </p>
          </div>
          <div className="bg-white/20 rounded-full p-2 sm:p-3 ml-4 flex-shrink-0">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-4 sm:space-y-5">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-2 sm:pb-3">
              Contact Information
            </h3>

            <div className="flex items-start space-x-4">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base text-gray-500 font-medium">
                  Phone
                </p>
                <p className="text-gray-800 text-base sm:text-lg mt-1">
                  {user.phone || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base text-gray-500 font-medium">
                  Website
                </p>
                <p className="text-gray-800 text-base sm:text-lg mt-1 break-words">
                  {user.website ? (
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 hover:underline"
                    >
                      {user.website}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-2 sm:pb-3">
              Location & Work
            </h3>

            <div className="flex items-start space-x-4">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base text-gray-500 font-medium">
                  Address
                </p>
                <p className="text-gray-800 text-base sm:text-lg mt-1">
                  {user.address ? (
                    <>
                      {user.address.street && (
                        <span className="block">{user.address.street}</span>
                      )}
                      <span>{user.address.city || "N/A"}</span>
                      {user.address.zipcode && (
                        <span className="block text-sm text-gray-600">
                          {user.address.zipcode}
                        </span>
                      )}
                    </>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base text-gray-500 font-medium">
                  Company
                </p>
                <p className="text-gray-800 text-base sm:text-lg mt-1">
                  {user.company?.name || "N/A"}
                </p>
                {user.company?.catchPhrase && (
                  <p className="text-sm sm:text-base text-gray-600 italic mt-2 break-words">
                    "{user.company.catchPhrase}"
                  </p>
                )}
                {user.company?.bs && (
                  <p className="text-xs text-gray-500 mt-1">
                    {user.company.bs}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-3 px-6 sm:px-8 py-3 sm:py-4 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto justify-center"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to User List</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
