import { useReducer, useCallback } from "react";

const httpReducer = (state, action) => {
  if (action.type === "SENDING") {
    return { data: null, error: null, status: "pending" };
  }
  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      error: null,
      status: "completed",
    };
  }
  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage,
      status: "completed",
    };
  }
  return state;
};

// 🢣 hook-ul personalizat 🢣 2 parametrii: functia ce trimite solicitarea si 'daca incepe in pending/loading sau nu DIN MOMENTUL IN CARE A FOST INSTANTAT HOOK-ul'
const useHttp = (requestFunction, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    data: null,
    error: null,
    status: startWithPending ? "pending" : null,
  });

  //functia ce-mi trimite solicitarea
  const sendRequest = useCallback(
    async (requestData) => {
      // pensing/loading 🢣
      dispatch({ type: "SENDING" });
      try {
        //apelez si astept executarea solicitarii trimise si preiau valoarea
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
