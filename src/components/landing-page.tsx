import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

import UIButton from "../helpers/ui-components/ui-button";
import UIImage from "../helpers/ui-components/ui-image";
import UIText from "../helpers/ui-components/ui-text";

import projectList from "../data/gis-projects.json";
import UISidebar from "../helpers/ui-components/ui-sidebar";

export default function LandingPage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % projectList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const current = projectList[index];

  return (
    <div className="min-h-screen  text-base-content overflow-x-hidden">
      <UISidebar
        body={<></>}
        footer={<p className="text-xs">v1.0.4</p>}
        className="border-gray-500"
        style={{ backdropFilter: "blur(10px)" }} 
      />
      <div className="relative w-full h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <UIImage
              src={`../src/images/${current.img}`}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-r from-gray-800 via-gray-500/70 to-transparent" />

            <div className="absolute inset-0 flex items-center px-8 md:px-20">
              <div className="max-w-xl space-y-4">
                <UIText type="header">{current.name}</UIText>

                <UIText
                  type="paragraph"
                  className="text-secondary-content"
                  expand
                >
                  {current.description}
                </UIText>

                <UIButton
                  prefix={<Play size={18} />}
                  mid="Open Tool"
                  onClick={() => navigate(current.path)}
                  className="bg-transparent text-gray-200"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-10 right-10 flex gap-4">
          {projectList.map((project, i) => (
            <UIImage
              key={i}
              src={`../src/images/${project.img}`}
              className={`w-28 h-16 object-cover rounded-md cursor-pointer transition
              ${i === index ? "border-2 border-white" : "opacity-60"}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 space-y-8">
        <UIText type="header">Explore GIS Tools</UIText>

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
        >
          {projectList.map((project, i) => (
            <div
              key={i}
              onClick={() => navigate(project.path)}
              className="
                cursor-pointer
                rounded-xl
                overflow-hidden
                bg-base-200
                hover:scale-105
                transition
                shadow
              "
            >
              <UIImage
                src={`../src/images/${project.img}`}
                className="w-full h-160px object-cover"
                isHoverEffect
              />

              <div className="p-4 space-y-2">
                <UIText type="subheader">{project.name}</UIText>

                <UIText
                  type="paragraph"
                  className="text-secondary-content"
                  expand
                >
                  {project.description}
                </UIText>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
