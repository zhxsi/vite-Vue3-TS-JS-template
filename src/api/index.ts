import request from "@/utils/service";
export function getIp() {
  return request({
    url: `/artist/top/song`,
    method: "POST",
    params: {
      id: 6452,
    },
  });
}
