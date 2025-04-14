
# Project Setup: Svelte 5, Tailwind 4, Rollup 4 with Django/Flask Backend

This project demonstrates how to set up a web application using TypeScript, Svelte v5.x, Tailwind v4.x, and Rollup v4.x for the frontend, integrated with either a Django or Flask backend.

This setup is the result of the blog post: [Svelte + Tailwind with Rollup and Django/FastAPI as the backend](https://nedo.im/blog/2025/04/14/svelte-tailwind-with-rollup-and-djangoflask-as-the-backend)


## Prerequisites

- Node.js (v22.14.0 or later recommended)
- npm (v10.9.2 or later recommended)
- Python (3.13 recommended)
- Conda (optional, for virtual environment management)

## Project Structure

```
myproject/
├── django_back/      # Django backend files
│   ├── manage.py
│   ├── mysite/       # Django project settings
│   ├── myapp/        # Django app
│   ├── static/       # Static files for Django (including frontend build)
│   ├── templates/    # Django templates
│   └── requirements.txt
├── flask_back/       # Flask backend files
│   ├── app.py
│   ├── static/       # Static files for Flask (including frontend build)
│   ├── templates/    # Flask templates
│   └── requirements.txt
├── myfrontend/       # Frontend source files
│   ├── node_modules/
│   ├── src/
│   │   ├── App.svelte
│   │   ├── app.css
│   │   └── main.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── rollup.config.js
│   ├── svelte.config.js
│   └── tsconfig.json
└── README.md
```

## Setup Steps

### 1. Initialization

Create the main project directory and the frontend directory.

```bash
mkdir myproject && cd myproject
mkdir myfrontend && cd myfrontend && npm init -y
```

Update `myfrontend/package.json`:
- Set `"type": "module"`
- Set `"main": "src/main.ts"`

Create frontend source files:

```bash
mkdir src && touch src/main.ts && touch src/app.css
```

### 2. Frontend Dependencies

Navigate to `myfrontend` directory and install dependencies.

**TypeScript:**

```bash
npm install typescript --save-dev
npx tsc --init
```

Ensure `target` and `module` are set to `ESNext` in `tsconfig.json`.

**Rollup & Plugins:**

```bash
npm install rollup --save-dev
npm install --save-dev rollup-plugin-svelte @rollup/plugin-node-resolve @rollup/plugin-replace @rollup/plugin-typescript @rollup/plugin-terser
touch rollup.config.js
```

**Tailwind CSS:**

```bash
npm install tailwindcss @tailwindcss/cli --save
```

Add `@import "tailwindcss";` to `src/app.css`.

**Svelte:**

```bash
npm install svelte --save
npm install svelte-preprocess --save-dev
touch svelte.config.js
```

Populate `svelte.config.js`, `src/App.svelte`, and `src/main.ts` as described in the tutorial or refer to the files in this repository.

### 3. Virtual Environment (Recommended)

Create and activate a Python virtual environment (using Conda example):

```bash
conda create --yes --name myproject python=3.13 && conda activate myproject
```

### 4. Backend Setup

**Django:**

```bash
cd .. # Move to myproject directory
mkdir django_back && cd django_back
touch requirements.txt
echo "Django==5.2" > requirements.txt # Use the latest version
pip install -r requirements.txt
django-admin startproject mysite .
python manage.py startapp myapp
mkdir -p myapp/templates && touch myapp/templates/index.html myapp/templates/base.html
touch myapp/urls.py
mkdir -p static/frontend/css static/frontend/js
```

Configure `mysite/settings.py`, `mysite/urls.py`, `myapp/views.py`, `myapp/urls.py`, `myapp/templates/base.html`, and `myapp/templates/index.html` as per the tutorial or repository files.

**Flask:**

```bash
cd .. # Move to myproject directory
mkdir flask_back && cd flask_back
touch requirements.txt
echo "Flask==3.1.0" > requirements.txt # Use the latest version
pip install -r requirements.txt
mkdir templates && touch templates/index.html templates/base.html
touch app.py
mkdir -p static/frontend/css static/frontend/js
```

Configure `app.py`, `templates/base.html`, and `templates/index.html` as per the tutorial or repository files.

### 5. Bridging Frontend and Backend

**Rollup Configuration:**

Update `myfrontend/rollup.config.js` to output bundled files to the correct backend static directory (`django_back/static/frontend/js` or `flask_back/static/frontend/js`). Refer to the `rollup.config.js` in this repository.

**Package.json Scripts:**

Install `concurrently`:

```bash
cd ../myfrontend
npm install concurrently --save-dev
```

Update the `scripts` section in `myfrontend/package.json` to include build and development commands for both Tailwind and Rollup, targeting either the Django or Flask backend. Refer to the `package.json` in this repository for examples (`dev-django`, `prod-django`, `dev-flask`, `prod-flask`).

## Running the Project

### Django

1.  **Build Frontend (Development):**
    ```bash
    cd myfrontend
    npm run dev-django
    ```
    *(Keep this terminal running)*

2.  **Run Django Server:**
    Open a **new terminal**, activate the virtual environment, and navigate to `django_back`.
    ```bash
    cd ../django_back
    # conda activate myproject (if needed)
    python manage.py runserver 8090
    ```
    Access the app at `http://127.0.0.1:8090/`.

3.  **Build Frontend (Production):**
    ```bash
    cd myfrontend
    npm run prod-django
    ```

### Flask

1.  **Build Frontend (Development):**
    ```bash
    cd myfrontend
    npm run dev-flask
    ```
    *(Keep this terminal running)*

2.  **Run Flask Server:**
    Open a **new terminal**, activate the virtual environment, and navigate to `flask_back`.
    ```bash
    cd ../flask_back
    # conda activate myproject (if needed)http://127.0.0.1:8000/blog/2025/04/12/svelte-tailwind-with-rollup-and-djangofastapi-as-the-backend
    flask run --debug
    ```
    Access the app at `http://127.0.0.1:5000/` (or the port specified by Flask).

3.  **Build Frontend (Production):**
    ```bash
    cd myfrontend
    npm run prod-flask
    ```

## Conclusion

This setup provides a robust development environment combining the strengths of modern frontend tools with popular Python backends. Adjust configurations and versions as needed for your specific project requirements.
