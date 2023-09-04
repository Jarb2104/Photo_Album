'use client';

import Link from 'next/link';
import Image from 'next/image';

import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';

import LogoAsset from '/assets/images/logo.png';
import ProfileAsset from 'assets/images/profile.png';

const NavBar = () => {
	const { data: session } = useSession();

	const [providers, setCurrentProviders] = useState(null);
	const [toggleDropDown, settoggleDropDown] = useState(false);

	useEffect(() => {
		const setProviders = async () => {
			const response = await getProviders();

			setCurrentProviders(response);
		};

		setProviders();
	}, []);

	return (
		<nav className='flex-between w-full mb-16 pt-3'>
			<Link
				href='/'
				className='flex gap-2 flex-center'
			>
				<Image
					src={LogoAsset}
					width={30}
					height={30}
					className='object-contain'
					alt='logo'
				/>
				<p className='logo_text'>Photo Album Prompts</p>
			</Link>

			<div className='sm:flex hidden'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link
							href='/create-prompt'
							className='black_btn'
						>
							Create Prompt
						</Link>
						<button
							type='button'
							onClick={signOut}
							className='outline_btn'
						>
							Sign Out
						</button>
						<Link href='/profile'>
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								className='rounded-full'
								alt='profile'
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((prv) => (
								<button
									type='button'
									key={prv.name}
									onClick={() => signIn(prv.id)}
									className='black_btn'
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			<div className='sm:hidden flex relative'>
				{session?.user ? (
					<div className='flex'>
						<Image
							src={session?.user.image}
							width={37}
							height={37}
							className='rounded-full'
							alt='profile'
							onClick={() => settoggleDropDown((prev) => !prev)}
						/>

						{toggleDropDown && (
							<div className='dropdown'>
								<Link
									href='/profile'
									className='dropdown_link'
									onClick={() => settoggleDropDown(false)}
								>
									My Profile
								</Link>
								<Link
									href='/create-prompt'
									className='dropdown_link'
									onClick={() => settoggleDropDown(false)}
								>
									Create Prompt
								</Link>
								<button
									type='button'
									onClick={() => {
										settoggleDropDown(false);
										signOut();
									}}
									className='mt-5 w-full black_btn'
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((prv) => (
								<button
									type='button'
									key={prv.name}
									onClick={() => signIn(prv.id)}
									className='black_btn'
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
