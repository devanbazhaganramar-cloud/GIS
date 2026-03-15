import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content p-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h1 className="text-8xl font-black text-primary opacity-80">404</h1>
        <h2 className="text-3xl font-bold tracking-tight">
          Lost in the Matrix?
        </h2>
        <p className="text-lg opacity-70 max-w-md mx-auto">
          The coordinates you entered don't exist on our map. Let's get you back
          to the main dashboard.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-10"
      >
        <NavLink
          to="/"
          className="btn btn-primary btn-wide rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-300"
        >
          Return to Dashboard
        </NavLink>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
