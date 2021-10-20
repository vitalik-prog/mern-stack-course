import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import LinkCard from "../components/LinkCard";


const DetailPage = () => {
  const [link, setLink] = useState(null)
  const linkId = useParams().id
  const {request, loading} = useHttp()
  const auth = useContext(AuthContext)
  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })
      setLink(fetched)
    } catch (e) {}
  },[linkId, request, auth.token])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && link && <LinkCard link={link} />}
    </>
  );
};

export default DetailPage;