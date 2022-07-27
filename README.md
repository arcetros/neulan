<p  align="center"><img  src="https://i.postimg.cc/tJCKKsvh/Frame-1.png"></p>

<p  align="center">
<a href="https://neulan.vercel.app">View Demo</a>
|
<a href="https://github.com/arcetros/Neulan/issues">Report Bug</a>
|
<a href="https://github.com/arcetros/Neulan/issues">Request Feature</a>
</p>

## About the project

**Neulan** is a weather forecast application developed in typescript using React. The app allows you to search weather data from your current location or any other specific locations around the globe using [OpenWeatherMap](https://openweathermap.org/) API

### Built with

- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚩 Features

- [x] City weather, preferably current location (using geolocation or browser ip if location permission not granted)
- [x] Search by city
- [x] Forecast by today and for the week
- [x] Message recommendations based on current weather condition
- [x] Detailed conditions for weather (e.g:., wind speed, rain chance, etc)
- [x] Lifting state up to the url
- [x] Convertable units of measurement (metric & imperial)
- [x] Light Mode / Dark Mode
- [ ] .. More 🙄 ?

## Getting Started

To clone and run this application, you'll need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com/)) installed on your computer. From your command line:

```
# Clone this repository
$ git clone https://github.com/arcetros/neulan

# Go into the repository
$ cd neulan

# Install dependencies for the frontend and run the server
$ npm install
```

### Setup

Create a file called **.env** in the root of the **Neulan** project. Add the following code in the file.

```
REACT_APP_CITY_API= <insert here>
```

Neulan is using Geo location, Onecall and Daily API from [OpenWeatherMap](https://openweathermap.org/). to be able to access their API you need to have an account and API Key which u can get it from here [here](https://openweathermap.org/api).

### Run the application

You can now start the application if you followed the instruction 🥳🎉

```bash
npm run dev
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.txt` for more information

## Acknowledgments

- Neulan is using [Srawana Dashboard Design](https://dribbble.com/shots/18425258-Srawana-Weather-Dashboard-Design) as whole design
- [OpenWeatherMap](https://openweathermap.org/) API for fetching forecasts and city names
- [gelocation-db](https://geolocation-db.com/json/) to get browsers ip
- [MomentJS](https://momentjs.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Recharts](https://recharts.org)
- [country-list](https://www.npmjs.com/package/country-list)
