import Link from 'next/link';
import styles from './Pagination.module.css';  // CSS 파일 임포트

export default function Pagination({ currentPage, hasNextPage }) {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    const nextPage = currentPage + 1;

    return (
        <div className={styles.pagination}>
            <Link href={`/?page=${prevPage}`} className={`${styles.paginationLink} ${currentPage === 1 ? styles.disabled : ''}`}>
                이전
            </Link>
            {hasNextPage ? (
                <Link href={`/?page=${nextPage}`} className={styles.paginationLink}>
                    다음
                </Link>
            ) : (
                <span className={`${styles.paginationLink} ${styles.disabled}`}>
                    다음
                </span>
            )}
        </div>
    );
}
