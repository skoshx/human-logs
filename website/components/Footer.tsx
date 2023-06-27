import Image from 'next/image'

export function Footer() {
	return (
		<footer className="space-y-4 w-full h-24 flex items-center justify-center">
			<p className="text-sm text-gray-400 flex space-x-1 items-center">
				<span className="block select-none">Crafted by</span>
				<a
					className="rounded-full flex space-x-1 p-1 pr-1.5 transition-colors hover:bg-gray-200 text-gray-900"
					href="//skosh.dev"
				>
					<Image
						width={20}
						height={20}
						className="rounded-full"
						src="https://avatars.githubusercontent.com/u/16806818?v=4"
						alt="skoshx's GitHub profile avatar"
					/>
					<span className="block">skoshx</span>
				</a>
			</p>
		</footer>
	)
}
