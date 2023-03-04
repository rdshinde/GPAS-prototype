export const getSteps = (payload: string): any => {
  switch (payload) {
    case "register":
      return [
        {
          stepName: "Username",
          stepNumber: 1,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: "Password",
          stepNumber: 2,
          isActive: false,
          isCompleted: false,
        },
        {
          stepName: "Done!",
          stepNumber: 3,
          isActive: false,
          isCompleted: false,
        },
      ];
    case "recover":
      return [
        {
          stepName: "Username",
          stepNumber: 1,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: "Verify",
          stepNumber: 2,
          isActive: false,
          isCompleted: false,
        },
        {
          stepName: "Password",
          stepNumber: 3,
          isActive: false,
          isCompleted: false,
        },
        {
          stepName: "Done!",
          stepNumber: 4,
          isActive: false,
          isCompleted: false,
        },
      ];
    case "login":
      return [
        {
          stepName: "Username",
          stepNumber: 1,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: "Password",
          stepNumber: 2,
          isActive: false,
          isCompleted: false,
        },
        {
          stepName: "Done!",
          stepNumber: 3,
          isActive: false,
          isCompleted: false,
        },
      ];
    default:
      return [];
  }
};
