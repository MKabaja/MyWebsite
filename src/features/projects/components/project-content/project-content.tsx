import { Info } from 'lucide-react';
import Image from 'next/image';
import { Fragment, type ReactNode } from 'react';
import type { ContentBlock } from '@/features/projects/model/projects.types';
import type { Locale } from '@/i18n/routing';
import { projectContentStyles } from './project-content.styles';

type ProjectContentProps = {
	blocks: ContentBlock[];
	locale: Locale;
};

type BlockType = ContentBlock['type'];
type BlockByType = {
	[Type in BlockType]: Extract<ContentBlock, { type: Type }>;
};
type RendererByBlockType = {
	[Type in BlockType]: (block: BlockByType[Type], locale: Locale) => ReactNode;
};

const IMAGE_WIDTH_IN_PIXELS = 1974;
const IMAGE_HEIGHT_IN_PIXELS = 1110;

const {
	blocks: blockList,
	heading,
	paragraph,
	figure,
	imageFrame,
	image,
	caption,
} = projectContentStyles;

const rendererByBlockType: RendererByBlockType = {
	heading: renderHeading,
	paragraph: renderParagraph,
	image: renderImage,
};

export function ProjectContent({ blocks, locale }: ProjectContentProps) {
	return (
		<div className={blockList}>
			{blocks.map((block) => (
				<Fragment key={getBlockKey(block)}>
					{renderBlock(block.type, block, locale)}
				</Fragment>
			))}
		</div>
	);
}

function renderBlock<Type extends BlockType>(
	type: Type,
	block: BlockByType[Type],
	locale: Locale,
) {
	return rendererByBlockType[type](block, locale);
}

function getBlockKey(block: ContentBlock) {
	return `${block.type}-${block.type === 'image' ? block.src : block.text.en}`;
}

function renderHeading(block: BlockByType['heading'], locale: Locale) {
	return (
		<h2 className={heading} data-fade>
			{block.text[locale]}
		</h2>
	);
}

function renderParagraph(block: BlockByType['paragraph'], locale: Locale) {
	return (
		<p className={paragraph} data-fade>
			{block.text[locale]}
		</p>
	);
}

function renderImage(block: BlockByType['image'], locale: Locale) {
	return (
		<figure className={figure} data-fade>
			<div className={imageFrame}>
				<Image
					src={block.src}
					alt={block.alt[locale]}
					width={IMAGE_WIDTH_IN_PIXELS}
					height={IMAGE_HEIGHT_IN_PIXELS}
					className={image}
				/>
			</div>
			{block.caption && (
				<figcaption className={caption}>
					<Info size={14} aria-hidden />
					{block.caption[locale]}
				</figcaption>
			)}
		</figure>
	);
}
