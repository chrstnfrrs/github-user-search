import * as React from 'react';
import * as DateFns from 'date-fns';

import { defaultUser } from '../constants/user-constants';
import useFetch from '../hooks/useFetch';
import useTheme from '../hooks/useTheme';
import MoonIcon from '../icons/moon';
import SunIcon from '../icons/sun';
import LocationIcon from '../icons/location';
import LinkIcon from '../icons/link';
import TwitterIcon from '../icons/twitter';
import CompanyIcon from '../icons/company';
import SearchIcon from '../icons/search';

const URL = '/api/search';

const UserStats = ({ title, value }) => (
  <div className='flex flex-1 flex-col items-center md:items-start'>
    <h3 className='text-[10px] dark:text-white md:text-xs'>{title}</h3>
    <p className='text-base font-bold dark:text-white md:text-2xl'>{value}</p>
  </div>
);

const UserInfo = ({ Icon, children }) => (
  <div
    className={`flex items-center gap-3 fill-primaryText text-primaryText dark:fill-white dark:text-white ${
      children ?? 'opacity-50'
    }`}
  >
    <div className='flex w-5 justify-center'>{Icon}</div>
    <p className='text-sm md:text-base'>{children ?? 'Not Available'}</p>
  </div>
);

const GithubSearch = () => {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = React.useState(defaultUser);
  const [username, setUsername] = React.useState('chrstnfrrs');
  const { data, refetch, error } = useFetch(URL, { params: { username } });

  React.useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data]);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  return (
    <div className='flex min-w-screen min-h-screen flex-1 items-center justify-center bg-lightBlue dark:bg-darkBlue'>
      <div className='mx-6 w-full flex-col md:mx-24 xl:max-w-[45rem]'>
        <div className='mb-8 flex justify-between'>
          <h1 className='text-3xl font-bold text-offBlack dark:text-white'>
            devfinder
          </h1>
          <div className='flex items-center gap-1'>
            {theme === 'light' ? (
              <div
                onClick={toggleTheme}
                className='flex cursor-pointer items-center gap-4 fill-lightGrey text-lightGrey hover:fill-offBlack hover:text-offBlack'
              >
                <p className='text-xs font-bold'>Light</p>
                <MoonIcon />
              </div>
            ) : (
              <div
                onClick={toggleTheme}
                className='flex cursor-pointer items-center gap-4 fill-white text-white hover:fill-midBlue hover:text-midBlue'
              >
                <p className='text-xs font-bold'>Dark</p>
                <SunIcon />
              </div>
            )}
          </div>
        </div>
        {/* Search Bar */}
        <div className='mb-6 flex items-center gap-2 rounded-2xl bg-offWhite px-3 drop-shadow-lightInput dark:bg-offBlue dark:drop-shadow-none md:gap-6'>
          <SearchIcon className='ml-2 ml-0 mr-[-0.75rem] h-6 w-14 fill-primaryText md:ml-5 md:mr-0' />
          <input
            className='w-full cursor-pointer bg-offWhite py-5 text-sm text-offBlack outline-0 placeholder:text-primaryText dark:bg-offBlue dark:text-white dark:placeholder:text-white md:text-lg'
            name='github-username'
            placeholder='Search GitHub username…'
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {error && (
            <p className='hidden whitespace-nowrap text-red md:flex'>
              No Results
            </p>
          )}
          <button
            className='rounded-lg bg-primary px-4 py-3 text-sm text-white hover:bg-secondary md:px-6 md:text-base'
            type='button'
            onClick={refetch}
          >
            Search
          </button>
        </div>
        {/* User Card */}
        <div className='flex flex-wrap gap-8 rounded-2xl bg-offWhite p-6 drop-shadow-lightInput dark:bg-offBlue dark:drop-shadow-none md:p-10 lg:p-12'>
          <img
            alt={`${user.name} profile image`}
            src={user.avatarUrl}
            className='hidden h-28 w-28 rounded-full lg:block'
          />
          <div className='flex w-full flex-1 flex-col  overflow-hidden'>
            <div className='flex items-center gap-5 md:gap-8 lg:flex-col lg:items-start'>
              <img
                alt={`${user.name} profile image`}
                src={user.avatarUrl}
                className='block h-16 w-16 rounded-full md:h-28 md:w-28 lg:hidden'
              />
              <div className='flex w-full flex-col flex-wrap overflow-hidden'>
                <div className='flex flex-col flex-wrap items-start justify-between overflow-hidden lg:flex-row lg:items-center'>
                  <h2 className='text-lg font-bold text-offBlack dark:text-white md:text-2xl'>
                    {user.name}
                  </h2>
                  {Boolean(user.createdAt) && (
                    <p className='hidden text-base text-lightGrey dark:text-white lg:flex'>
                      Joined{' '}
                      {DateFns.format(new Date(user.createdAt), 'dd MMM yyyy')}
                    </p>
                  )}
                </div>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`https://github.com/${user.login}`}
                  className='dark:primary text-sm decoration-primary hover:underline md:text-base'
                >
                  <p className='text-primary'>@{user.login}</p>
                </a>
                {Boolean(user.createdAt) && (
                  <p className='mt-1 flex text-sm text-lightGrey dark:text-white lg:hidden'>
                    Joined{' '}
                    {DateFns.format(new Date(user.createdAt), 'dd MMM yyyy')}
                  </p>
                )}
              </div>
            </div>
            <p className='mt-5 text-sm text-primaryText dark:text-white md:text-base'>
              {user.bio}
            </p>
            <div className='mt-9 mb-9 flex justify-between rounded-lg bg-lightBlue px-8 py-4 dark:bg-darkBlue'>
              <UserStats title='Repos' value={user.repositories.totalCount} />
              <UserStats title='Followers' value={user.followers.totalCount} />
              <UserStats title='Following' value={user.following.totalCount} />
            </div>
            <div className='flex flex-col gap-4 md:flex-row md:gap-8'>
              <div className='flex flex-1 flex-col flex-wrap gap-4 overflow-hidden'>
                <UserInfo Icon={<LocationIcon />}>{user.location}</UserInfo>
                {user.websiteUrl ? (
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={`${
                      user.websiteUrl.startsWith('http')
                        ? user.websiteUrl
                        : `https://${user.websiteUrl}`
                    }`}
                    className='decoration-primaryText hover:underline dark:decoration-white'
                  >
                    <UserInfo Icon={<LinkIcon />}>{user.websiteUrl}</UserInfo>
                  </a>
                ) : (
                  <UserInfo Icon={<LinkIcon />}>{user.websiteUrl}</UserInfo>
                )}
              </div>
              <div className='flex flex-1 flex-col flex-wrap gap-4 overflow-hidden'>
                {user.twitterUsername ? (
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={`https://twitter.com/${user.twitterUsername}`}
                    className='decoration-primaryText hover:underline dark:decoration-white'
                  >
                    <UserInfo Icon={<TwitterIcon />}>
                      {user.twitterUsername}
                    </UserInfo>
                  </a>
                ) : (
                  <UserInfo Icon={<TwitterIcon />}>
                    {user.twitterUsername}
                  </UserInfo>
                )}
                <UserInfo Icon={<CompanyIcon />}>{user.company}</UserInfo>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubSearch;
