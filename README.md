# OptiSnap: Client-Side Image Optimizer

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cpamungkas/optisnap-image-optimizer)

OptiSnap is a visually stunning, high-performance web application for compressing and optimizing images directly in the browser. It leverages client-side processing to ensure user privacy, with no images ever being uploaded to a server. Users can drag and drop multiple JPG, PNG, and WebP files, select from predefined compression levels (Low, Medium, High), and instantly see a before-and-after comparison. The application provides detailed statistics on size reduction for each image. Optimized images can be downloaded individually or bundled together in a single ZIP archive. The user interface is crafted with a minimalist aesthetic, focusing on clarity, simplicity, and an exceptional user experience across all devices.

## ✨ Key Features

-   **Privacy-First:** All image processing happens in your browser. No files are ever sent to a server.
-   **Batch Processing:** Upload and optimize multiple images at once.
-   **Drag & Drop Interface:** A modern, intuitive drag-and-drop zone for easy file uploads.
-   **Adjustable Compression:** Choose between Low, Medium, and High compression levels to find the perfect balance of quality and file size.
-   **Instant Previews:** See a real-time comparison of the original and optimized images.
-   **Detailed Stats:** View the original size, compressed size, and percentage saved for each image.
-   **Flexible Downloads:** Download optimized images one by one or all together as a convenient ZIP archive.
-   **Modern & Responsive:** A clean, minimalist design that looks and works great on any device.

## 🚀 Technology Stack

-   **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
-   **Image Compression:** [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression)
-   **File Handling:** [react-dropzone](https://react-dropzone.js.org/), [JSZip](https://stuk.github.io/jszip/), [file-saver](https://github.com/eligrey/FileSaver.js/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Animation:** [Framer Motion](https://www.framer.com/motion/)
-   **Deployment:** [Cloudflare Workers](https://workers.cloudflare.com/)

## 🏁 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

You need to have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/your-username/optisnap.git
    ```
2.  Navigate into the project directory:
    ```sh
    cd optisnap
    ```
3.  Install the dependencies using Bun:
    ```sh
    bun install
    ```

### Running Locally

To start the development server, run the following command:

```sh
bun run dev
```

The application will be available at `http://localhost:3000` (or the port specified in your environment).

## 🛠️ Development

The project is structured with the frontend application code in the `/src` directory and the Cloudflare Worker server-side code in the `/worker` directory.

-   **`src/`**: Contains all React components, pages, hooks, and utility functions for the client-side application.
-   **`worker/`**: Contains the Hono-based Cloudflare Worker code for handling API requests (if any are added).

The development server supports hot-reloading, so any changes you make to the code will be reflected in the browser instantly.

## ☁️ Deployment

This project is configured for seamless deployment to the Cloudflare global network.

To deploy your application, simply run the following command:

```sh
bun run deploy
```

This command will build the application and deploy it using the Wrangler CLI.

Alternatively, you can deploy your own version of this project with a single click:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cpamungkas/optisnap-image-optimizer)

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the application, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.