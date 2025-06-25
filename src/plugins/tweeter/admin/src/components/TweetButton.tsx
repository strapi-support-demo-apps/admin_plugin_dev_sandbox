import { Button } from '@strapi/design-system';
import { useFetchClient } from '@strapi/strapi/admin';
import { useParams } from 'react-router-dom';

const TweetButton = (props: any) => {
  const { id } = useParams();
  const fetch = useFetchClient();
  const handleClick = async (event: any) => {
    await fetch.post('/tweeter/tweet_article/' + id);
  };

  return (
    <Button fullWidth={true} onClick={handleClick}>
      Tweet Article
    </Button>
  );
};

export default TweetButton;
