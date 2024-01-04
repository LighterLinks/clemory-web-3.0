import toast from "react-hot-toast";

import {
  ColorScheme,
  ColorSchemeDark,
} from "@/Designer";

export const deleteToast = () => toast.error("Element deleted successfully!");

export const addToast = () => toast.success("Element added successfully!");

export const updateToast = () => toast.success("Element updated successfully!");

export const errorToast = () => toast.error("Something went wrong!");

export const successToast = () => toast.success("Success!");

export const infoToast = (info: string) => toast.custom((t) => (
    <div
        className="flex items-center justify-between w-full"
        style={{ backgroundColor: ColorScheme.primaryGrey1 }}
    >
        <div className="flex items-center">
        <div className="flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-500">
            <svg
            className="w-4 h-4 text-white fill-current"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm-.5 12.5a.5.5 0 110-1 .5.5 0 010 1zm.8-3.9a.8.8 0 11-1.6 0V5.8a.8.8 0 111.6 0v2.8z" />
            </svg>
        </div>
        <div className="text-sm font-medium text-blue-500">{info}</div>
        </div>
        <div className="flex items-center">
        <button
            onClick={() => toast.dismiss(t.id)}
            className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-blue-500 hover:bg-opacity-10"
        >
            <svg
            className="w-4 h-4 text-blue-500 fill-current"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.646 3.646a.5.5 0 01.708 0L8 7.293l3.646-3.647a.5.5 0 11.708.708L8.707 8l3.647 3.646a.5.5 0 01-.708.708L8 8.707l-3.646 3.647a.5.5 0 01-.708-.708L7.293 8 3.646 4.354a.5.5 0 010-.708z"
            />
            </svg>
        </button>
        </div>
    </div>
));

