import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCamera, faCloudSun, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

function Navbar() {
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [isScriptLoaded, setIsScriptLoaded] = useState(false); // Track if the script is loaded
    const googleTranslateRef = useRef(null); // Ref to prevent duplicate initialization
    const tourRef = useRef(null); // Ref to initialize tour only once
    const cameraInputRef = useRef(null); // Ref for camera input
    const [selectedImage, setSelectedImage] = useState(null); // State for selected image

    const supportedLanguages = {
        en: { name: 'English', nativeName: 'English' },
        hi: { name: 'Hindi', nativeName: 'हिन्दी' },
        te: { name: 'Telugu', nativeName: 'తెలుగు' },
        ta: { name: 'Tamil', nativeName: 'தமிழ்' },
        kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
        mr: { name: 'Marathi', nativeName: 'मराठी' },
        gu: { name: 'Gujarati', nativeName: 'ગુજરાતી' },
        bn: { name: 'Bengali', nativeName: 'বাংলা' },
        pa: { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
    };

    useEffect(() => {
        // Only load script if it hasn't been loaded yet
        if (!isScriptLoaded) {
            const script = document.createElement("script");
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            script.onload = () => {
                setIsScriptLoaded(true);
            };
            script.onerror = () => {
                console.error("Google Translate script failed to load.");
            };

            document.body.appendChild(script);
        }

        window.googleTranslateElementInit = function () {
            if (!googleTranslateRef.current) {
                new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: Object.keys(supportedLanguages).join(','), // Include all supported languages
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false
                }, 'google_translate_element');
                googleTranslateRef.current = true;
            }
        };

        return () => {
            const script = document.querySelector("script[src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit']");
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, [isScriptLoaded]);

    useEffect(() => {
        // Initialize Shepherd Tour only once
        if (tourRef.current) return;

        const tour = new Shepherd.Tour({
            useModalOverlay: true,
            scrollTo: true,
            defaultStepOptions: {
                cancelIcon: { enabled: true },
            }
        });

        tour.addStep({
            title: 'Welcome to the Weather App!',
            text: 'This is where you can search for weather information.<br><br>ఇక్కడ మీరు వాతావరణ సమాచారం కోసం శోధించవచ్చు.<br><br>यहां आप मौसम की जानकारी के लिए खोज कर सकते हैं।',
            attachTo: { element: '.form-control.me-2', on: 'bottom' },
            buttons: [{ text: 'Next-తదుపరి-आगे', action: tour.next }],
        });

        tour.addStep({
            title: 'Camera Upload',
            text: 'Click here to upload a plant image for health analysis.<br><br>ఇక్కడ నొక్కి మొక్క చిత్రాన్ని ఆరోగ్య విశ్లేషణ కోసం అప్‌లోడ్ చేయండి.<br><br>यहां क्लिक करें और पौधे की छवि स्वास्थ्य विश्लेषण के लिए अपलोड करें।',
            attachTo: { element: '.btn-outline-success.ms-2', on: 'bottom' },
            buttons: [{ text: 'Next-తదుపరి-आगे', action: tour.next }],
        });

        tour.addStep({
            title: 'Home',
            text: 'This is the home page link.<br><br>ఇది హోమ్ పేజీ లింక్.<br><br>यह होम पेज का लिंक है।',
            attachTo: { element: '.nav-link.active[href="/"]', on: 'left' },
            buttons: [{ text: 'Next-తదుపరి-आगे', action: tour.next }],
        });

        tour.addStep({
            title: 'Weather Recommendations',
            text: 'Click here to see weather recommendations for your crops.<br><br>మీ పంటల కోసం వాతావరణ సిఫారసులను చూడటానికి ఇక్కడ నొక్కండి.<br><br>यहां क्लिक करें और अपनी फसलों के लिए मौसम की सिफारिशें देखें',
            attachTo: { element: '.nav-link.active[href="/weather"]', on: 'left' },
            buttons: [{ text: 'Next-తదుపరి-आगे', action: tour.next }],
        });

        tour.addStep({
            title: 'Google Translate',
            text: 'Translate this page into different languages using Google Translate.<br><br>ఈ పేజీని గూగుల్ ట్రాన్స్‌లేట్ ఉపయోగించి విభిన్న భాషలలో అనువదించండి.<br><br>इस पृष्ठ को गूगल ट्रांसलेट का उपयोग करके विभिन्न भाषाओं में अनुवाद करें।',
            attachTo: { element: '#google_translate_element', on: 'bottom' },
            buttons: [{ text: 'Next-తదుపరి-आगे', action: tour.next }],
        });

        tour.start();
        tourRef.current = true;
    }, []);

    const handleCameraClick = () => {
        cameraInputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <h1 className="me-5 notranslate" data-translate="true" data-original="AI Help Farmers">Farm Engineers</h1>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <form className="d-flex me-auto mt-2 mt-lg-0" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            data-translate="true"
                            data-original="Search"
                            data-bs-toggle="tooltip"
                            title="Search for crops, diseases, etc."
                        />
                        <button
                            className="btn btn-outline-success"
                            type="submit"
                            data-translate="true"
                            data-original="Search"
                            data-bs-toggle="tooltip"
                            title="Search"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        <button
                            className="btn btn-outline-success ms-2"
                            type="button"
                            onClick={handleCameraClick}
                            data-bs-toggle="tooltip"
                            title="Upload a plant image for health analysis"
                        >
                            <FontAwesomeIcon icon={faCamera} />
                        </button>
                        <input
                            type="file"
                            ref={cameraInputRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            capture="camera"
                            onChange={handleImageChange}
                        />
                        {selectedImage && (
                            <div>
                                <img src={selectedImage} alt="Uploaded Image" style={{ maxWidth: '200px' }} />
                            </div>
                        )}
                    </form>

                    <ul className="navbar-nav ms-auto gap-3">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/" data-bs-toggle="tooltip" title="Go to homepage">
                                <FontAwesomeIcon icon={faHome} />
                                <span data-translate="true" data-original="Home"> Home</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/weather" data-bs-toggle="tooltip" title="View weather updates">
                                <FontAwesomeIcon icon={faCloudSun} />
                                <span data-translate="true" data-original="Weather Recommendations"> Weather Recommendations</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <div id="google_translate_element" className="translate-container"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;