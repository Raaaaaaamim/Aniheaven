import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-text">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-secondary rounded-lg shadow-xl max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <FaExclamationTriangle className="text-primary text-6xl mx-auto mb-6" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4 font-poppins">Oops!</h1>
        <p className="text-lg mb-4">Sorry, an unexpected error has occurred.</p>
        <p className="text-grayText mb-6">
          <i>{error.statusText || error.message}</i>
        </p>
        <Link
          to="/"
          className="bg-primary text-slate-800 font-bold  px-6 py-2 rounded-full inline-block hover:bg-opacity-80 transition-all duration-300 font-poppins"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
