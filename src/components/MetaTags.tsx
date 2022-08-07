import Head from "next/head";

interface MetaTagsProps {
  author: string;
  description: string;
  image: string;
  keywords: string;
  title: string;
  type: string;
  url: string;
}

const MetaTags = ({
  author = "배달비 노노",
  description = "배달비 공유 어플",
  image,
  keywords = "배달비 공유, 배달비 쉐어, 배달",
  title = "배달비 노노",
  type,
  url,
}: Partial<MetaTagsProps>) => (
  <Head>
    <title>{title}</title>
    <meta content={description} name="description" />
    <meta content={keywords} name="keywords" />
    <meta content={author} name="author" />

    <meta content={title} property="og:title" />
    <meta content={description} property="og:description" />
    <meta content={type} property="og:type" />
    <meta content={url} property="og:url" />
    <meta content={image} property="og:image" />
  </Head>
);

export default MetaTags;
