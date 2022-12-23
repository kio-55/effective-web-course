import { ResultStatusType } from 'types/helpers';
import { observable, action, makeObservable, runInAction } from 'mobx';

import api from '../api';

import { SerialType } from '../types/comics';

class SeriesStore {
  @observable
  series: SerialType[] = [];

  @observable
  serial: SerialType | undefined;

  @observable
  seriesCount: number = 0;

  @observable
  seriesCurrentSlide: number = 0;

  @observable
  loading: boolean = false;

  @observable
  limit: number = 20;

  @observable
  error: ResultStatusType = 'success';

  constructor() {
    makeObservable(this);
  }

  @action
  getSeriesList = async (): Promise<void> => {
    try {
      this.loading = true;

      const series = await api.series.getSeriesList(this.limit);
      runInAction(() => {
        this.seriesCount = series.totalCount;
        this.series = series.serials;
        this.error = 'success';
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.error = 'error';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  getSeriesById = async (id: string): Promise<void> => {
    try {
      this.loading = true;
      this.serial = undefined;

      const serial = await api.series.getSeriesById(id, this.limit);
      runInAction(() => {
        this.serial = serial;
        this.error = 'success';
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.error = 'error';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  getSeriesListByIds = async (ids: string[]): Promise<void> => {
    try {
      this.loading = true;

      const series: SerialType[] = [];
      console.log(ids);
      for (const id in ids) {
        const serial = await api.series.getSeriesById(ids[id], this.limit);
        series.push(serial);
      }

      runInAction(() => {
        this.seriesCount = series.length;
        this.series = series;
        this.error = 'success';
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.error = 'error';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  getSeriesWithOffset = async (offset: number): Promise<void> => {
    try {
      this.loading = true;
      const series = await api.series.getSeriesWithOffset(offset, this.limit);
      runInAction(() => {
        this.seriesCurrentSlide = offset;
        this.series = series;
        this.error = 'success';
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.error = 'error';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  getSeriesWithName = async (offset: number, title: string): Promise<void> => {
    try {
      this.loading = true;
      const series = await api.series.getSeriesByName(
        offset,
        title,
        this.limit
      );
      runInAction(() => {
        this.seriesCurrentSlide = offset;
        this.series = series.serials;
        this.seriesCount = series.totalCount;
        this.error = 'success';
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.error = 'error';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  getSeriesWithOffsetAndAdd = async (offset: number): Promise<void> => {
    try {
      this.loading = true;
      const series = await api.series.getSeriesWithOffset(offset, this.limit);
      runInAction(() => {
        this.seriesCurrentSlide = offset;
        this.series = [...this.series, ...series];
        this.error = 'success';
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.error = 'error';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  getSeriesWithNameAndAdd = async (
    offset: number,
    title: string
  ): Promise<void> => {
    try {
      this.loading = true;
      const series = await api.series.getSeriesByName(
        offset,
        title,
        this.limit
      );
      runInAction(() => {
        this.seriesCurrentSlide = offset;
        this.series = [...this.series, ...series.serials];
        this.seriesCount = series.totalCount;
        this.error = 'success';
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.error = 'error';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

const seriesStore = new SeriesStore();

export default seriesStore;
