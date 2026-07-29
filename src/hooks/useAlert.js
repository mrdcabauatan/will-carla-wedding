import { useState } from "react";

export default function useAlert() {
    const [alert, setAlert] = useState({
        open: false,
        type: "info",
        title: "",
        message: "",
        confirmText: "OK",
        cancelText: "Cancel",
        showCancel: false,
        onConfirm: null,
    });

    const showAlert = ({
        type = "info",
        title,
        message,
        confirmText = "OK",
        cancelText = "Cancel",
        showCancel = false,
        onConfirm,
    }) => {
        setAlert({
            open: true,
            type,
            title,
            message,
            confirmText,
            cancelText,
            showCancel,
            onConfirm,
        });
    };

    const closeAlert = () => {
        setAlert((prev) => ({
            ...prev,
            open: false,
        }));
    };

    return {
        alert,
        showAlert,
        closeAlert,
    };
}