interface IPaginatedRequest<T> {
  page?: number;
  limit?: number;
  filters?: Partial<T>;
}

export { IPaginatedRequest };
