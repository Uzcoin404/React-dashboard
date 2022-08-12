export function Inbox({
    width = 20,
    height = 20,
    color = "#111827",
    className = "",
}) {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path
                d="M10.4484 8.75163C10.2221 8.53304 9.919 8.41208 9.60437 8.41482C9.28973 8.41755 8.98876 8.54375 8.76627 8.76624C8.54378 8.98873 8.41757 9.28971 8.41484 9.60434C8.41211 9.91898 8.53306 10.2221 8.75165 10.4484L11.1517 12.8484C11.3767 13.0734 11.6819 13.1998 12.0001 13.1998C12.3182 13.1998 12.6234 13.0734 12.8484 12.8484L15.2484 10.4484C15.467 10.2221 15.588 9.91898 15.5853 9.60434C15.5825 9.28971 15.4563 8.98873 15.2338 8.76624C15.0113 8.54375 14.7104 8.41755 14.3957 8.41482C14.0811 8.41208 13.778 8.53304 13.5517 8.75163L13.2001 9.10322V3.60002C13.2001 3.28176 13.0736 2.97654 12.8486 2.7515C12.6235 2.52645 12.3183 2.40002 12.0001 2.40002C11.6818 2.40002 11.3766 2.52645 11.1515 2.7515C10.9265 2.97654 10.8 3.28176 10.8 3.60002V9.10322L10.4484 8.75163Z"
            />
            <path
                d="M3.6001 5.99998C3.6001 5.36346 3.85295 4.75301 4.30304 4.30292C4.75313 3.85283 5.36358 3.59998 6.0001 3.59998H7.2001C7.51836 3.59998 7.82358 3.7264 8.04863 3.95145C8.27367 4.17649 8.4001 4.48172 8.4001 4.79998C8.4001 5.11824 8.27367 5.42346 8.04863 5.6485C7.82358 5.87355 7.51836 5.99998 7.2001 5.99998H6.0001V14.4H8.4001L9.6001 16.8H14.4001L15.6001 14.4H18.0001V5.99998H16.8001C16.4818 5.99998 16.1766 5.87355 15.9516 5.6485C15.7265 5.42346 15.6001 5.11824 15.6001 4.79998C15.6001 4.48172 15.7265 4.17649 15.9516 3.95145C16.1766 3.7264 16.4818 3.59998 16.8001 3.59998H18.0001C18.6366 3.59998 19.2471 3.85283 19.6972 4.30292C20.1472 4.75301 20.4001 5.36346 20.4001 5.99998V18C20.4001 18.6365 20.1472 19.2469 19.6972 19.697C19.2471 20.1471 18.6366 20.4 18.0001 20.4H6.0001C5.36358 20.4 4.75313 20.1471 4.30304 19.697C3.85295 19.2469 3.6001 18.6365 3.6001 18V5.99998Z"
            />
        </svg>
    );
}
