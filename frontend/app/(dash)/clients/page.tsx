// "use client";
// import React from "react";
// import ClientCard from "@/app/components/UI/ClientCard";
// import useSWR from "swr";
// import { User } from "@/app/utils/types/types";
// import { PlusIcon } from "lucide-react";

// function ClientsPage() {
//   const fetcher = (url: string) =>
//     fetch(url).then((response) => response.json());

//   const { data } = useSWR("/api/v1/clients", fetcher);
//   return (
//     <div className="flex flex-col space-y-3 ">
//       <div className="mx-auto w-fit bg-white text-black px-4 py-2 rounded-xl">
//         <h1 className="text-xl font-semibold leading-tight tracking-wide">
//           All Clients
//         </h1>
//       </div>
//       <div className="grid grid-cols-1 items-start gap-6 px-8 md:grid-cols-2 lg:grid-cols-2">
//         {data &&
//           data.map((user: User) => (
//             <div key={user.id}>
//               <ClientCard user={user} />
//             </div>
//           ))}
//       </div>
//       <div className="absolute">
//         <div className="relative z-10 bottom-6 left-6">
//           <PlusIcon />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ClientsPage;

"use client";
import React from "react";
import ClientCard from "@/app/components/UI/ClientCard";
import useSWR from "swr";
import { User } from "@/app/utils/types/types";
import { PlusIcon } from "lucide-react";

function ClientsPage() {
  const fetcher = (url: string) =>
    fetch(url).then((response) => response.json());

  const { data } = useSWR("/api/v1/clients", fetcher);

  return (
    <>
      {/* Main content */}
      <div className="flex flex-col space-y-6">
        <div className="mx-auto w-fit bg-white text-black px-4 py-2 rounded-xl">
          <h1 className="text-xl font-semibold leading-tight tracking-wide">
            All Clients
          </h1>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 px-8 md:grid-cols-2 lg:grid-cols-2">
          {data &&
            data.map((user: User) => (
              <div key={user.id}>
                <ClientCard user={user} />
              </div>
            ))}
        </div>
      </div>

      {/* Floating Action Button - OUTSIDE the main flow */}
      <button
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 hover:shadow-xl active:scale-95 transition-all"
        aria-label="Add new client"
      >
        <PlusIcon className="w-6 h-6" />
      </button>
    </>
  );
}

export default ClientsPage;
