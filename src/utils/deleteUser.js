export const deleteuser = async (
  userId,
  url,
  mutateUrl,
  setDeleting,
  mutate
) => {
  setDeleting(true);
  try {
    await fetch(`${url}?id=${userId}`, {
      method: "DELETE",
    });

    await mutate(mutateUrl), setDeleting(false);
  } catch (err) {
    console.log(err);
    setDeleting(false);
  }
};
