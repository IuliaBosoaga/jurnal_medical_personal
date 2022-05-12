/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react'
import { useLocation } from 'react-router-dom';

interface IUploadProps{
}

export default function upload(props: IUploadProps) {

  let location = useLocation();
  let s = location.state as {data:string}

  return (
    <div dangerouslySetInnerHTML={{ __html: s.data }}></div>
  )
}
