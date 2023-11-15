const kubernetesURL = "http://35.198.205.80";

const userApi =
    process.env.REACT_APP_ENV === "docker"
        ? "http://localhost:3001"
    : process.env.REACT_APP_ENV === "local"
        ? "http://localhost:3001"
        : kubernetesURL;

const questionApi =
    process.env.REACT_APP_ENV === "docker"
        ? "http://localhost:3002"
        : process.env.REACT_APP_ENV === "local"
        ? "http://localhost:3002"
        : kubernetesURL;

const matchingApi =
    process.env.REACT_APP_ENV === "docker"
        ? "http://localhost:3003"
        : process.env.REACT_APP_ENV === "local"
        ? "http://localhost:3003"
        : kubernetesURL;

const databaseApi =
    process.env.REACT_APP_ENV === "docker"
        ? "http://localhost:3005"
        : process.env.REACT_APP_ENV === "local"
        ? "http://localhost:3005"
        : "http://database-service-service.default.svc.cluster.local:3005";

export { userApi, questionApi, matchingApi, databaseApi };
