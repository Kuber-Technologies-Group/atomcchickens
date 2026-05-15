import { CSSProperties, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function NoticePopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem("notice-popup");

        if (!hasSeenPopup) {
            setIsOpen(true);
        }
    }, []);

    const closePopup = () => {
        localStorage.setItem("notice-popup", "true");
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <div style={styles.badge}>Notice</div>

                <h2 className="text-3xl font-playfair font-bold text-primary" style={{ lineHeight: 1.2 }}>
                    Welcome to <br /> Atomc Chickens
                </h2>

                <p className="mt-4 mb-6 text-sm text-white text-center">
                    🐣{" "}
                    <strong style={{ color: "#f4d06f" }}>
                        Breeding Season Notice
                    </strong>

                    <br />
                    <br />

                    We are excited to announce that the{" "}

                    <strong style={{ color: "#f4d06f" }}>
                        Atomc Chickens Breeding Season
                    </strong>{" "}

                    officially begins on the{" "}

                    <strong>1st of June</strong>.

                    <br />
                    <br />

                    Our first incubation cycle will begin shortly thereafter, with the
                    first hatching expected in approximately{" "}

                    <strong>21 days</strong>{" "}

                    <em>
                        (± a few days depending on breed and incubation conditions)
                    </em>.

                    <br />
                    <br />

                    Thank you for supporting premium poultry breeding and incubation
                    excellence.
                </p>

                <Button
                    onClick={closePopup}
                    className="inline-flex items-center justify-center p-6 rounded-md text-charcoal hover:text-primary hover:bg-cream focus:outline-none"
                >
                    Explore Website
                </Button>
            </div>
        </div>
    );
}

const styles: {
    overlay: CSSProperties;
    popup: CSSProperties;

    badge: CSSProperties;
} = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background:
            "linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.78))",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
    },

    popup: {
        background:
            "linear-gradient(145deg, #1a1208, #2b1d0e)",
        border: "1px solid rgba(212,175,55,0.25)",
        color: "#fff",
        padding: "40px",
        borderRadius: "24px",
        width: "100%",
        maxWidth: "480px",
        textAlign: "center",
        boxShadow:
            "0 20px 60px rgba(0,0,0,0.45)",
    },

    badge: {
        display: "inline-block",
        padding: "6px 14px",
        borderRadius: "999px",
        background: "rgba(212,175,55,0.12)",
        border: "1px solid rgba(212,175,55,0.25)",
        color: "#d4af37",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "2px",
        marginBottom: "18px",
    },
};