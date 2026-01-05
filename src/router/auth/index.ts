import request from "@/modules/_shared/lib/request";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  LoginFormData,
  RegisterFormData,
  AuthResponse,
} from "@/modules/_shared/types";

export function useLogin() {
  const key = `/auth/login`;

  const { trigger, data, error, isMutating } = useSWRMutation<
    AuthResponse,
    Error,
    typeof key,
    LoginFormData
  >(key, (url, { arg: data }) => request.post(url, data, {}));

  return { trigger, data, error, isMutating };
}

export function useRegister() {
  const key = `/auth/register`;
  const { trigger, data, error, isMutating } = useSWRMutation<
    AuthResponse,
    Error,
    typeof key,
    RegisterFormData
  >(key, (url, { arg: data }) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (
      data.profile_picture &&
      data.profile_picture instanceof FileList &&
      data.profile_picture[0]
    ) {
      formData.append("profile_picture", data.profile_picture[0]);
    }

    return request.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });
  return { trigger, data, error, isMutating };
}

export function useLogout() {
  const key = `/auth/logout`;
  const { trigger, data, error, isMutating } = useSWRMutation(key, (url) =>
    request.post(url)
  );
  return {
    data,
    isLoading: isMutating,
    isValidating: isMutating,
    error,
    mutate: trigger,
  };
}

export function useGetCurrentUser() {
  const key = `/auth/me`;
  const { data, isLoading, isValidating, error, mutate } = useSWR(key, (url) =>
    request.get(url)
  );
  return {
    data,
    isLoading: isLoading,
    isValidating: isValidating,
    error,
    mutate,
  };
}
