import { PredictionFeatures, PredictionResult } from '../types';

/**
 * Exact C5.0 Decision Tree Credit Scoring Model
 * Extracted directly from Riskrating_Model.rds (trained on 775 credit applicants)
 */
export function predictCreditRisk(features: PredictionFeatures): PredictionResult {
  const { dependents, income, tenor, age, empyear, debt, asset } = features;
  const path: string[] = [];
  let rating = 3;

  if (dependents > 4) {
    path.push(`Tanggungan > 4 (${dependents})`);
    if (income > 20.67) {
      path.push(`Pendapatan > 20.67 (${income})`);
      rating = 4;
    } else {
      path.push(`Pendapatan <= 20.67 (${income})`);
      if (tenor <= 24) {
        path.push(`Tenor <= 24 (${tenor} bln)`);
        if (age > 41) {
          path.push(`Usia > 41 (${age} thn)`);
          rating = 4;
        } else {
          path.push(`Usia <= 41 (${age} thn)`);
          if (debt > 4.9074) {
            path.push(`Beban hutang > 4.9074 (${debt})`);
            if (debt <= 14.21183) {
              path.push(`Beban hutang <= 14.21183 (${debt})`);
              rating = 4;
            } else {
              path.push(`Beban hutang > 14.21183 (${debt})`);
              rating = 5;
            }
          } else {
            path.push(`Beban hutang <= 4.9074 (${debt})`);
            if (debt <= 3.145822) {
              path.push(`Beban hutang <= 3.145822 (${debt})`);
              rating = 5;
            } else {
              path.push(`Beban hutang > 3.145822 (${debt})`);
              if (age <= 26) {
                path.push(`Usia <= 26 (${age} thn)`);
                rating = 2;
              } else {
                path.push(`Usia > 26 (${age} thn)`);
                if (dependents > 5) {
                  path.push(`Tanggungan > 5 (${dependents})`);
                  rating = 4;
                } else {
                  path.push(`Tanggungan <= 5 (${dependents})`);
                  if (tenor > 12) {
                    path.push(`Tenor > 12 (${tenor} bln)`);
                    rating = 2;
                  } else {
                    path.push(`Tenor <= 12 (${tenor} bln)`);
                    if (debt <= 4.401165) {
                      path.push(`Beban hutang <= 4.401165 (${debt})`);
                      rating = 4;
                    } else {
                      path.push(`Beban hutang > 4.401165 (${debt})`);
                      rating = 1;
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        // tenor > 24
        path.push(`Tenor > 24 (${tenor} bln)`);
        if (debt > 7.351783) {
          path.push(`Beban hutang > 7.351783 (${debt})`);
          rating = 5;
        } else {
          path.push(`Beban hutang <= 7.351783 (${debt})`);
          if (age <= 27) {
            path.push(`Usia <= 27 (${age} thn)`);
            rating = 2;
          } else {
            path.push(`Usia > 27 (${age} thn)`);
            if (asset > 636.2159) {
              path.push(`Aset > 636.2159 (${asset})`);
              rating = 5;
            } else {
              path.push(`Aset <= 636.2159 (${asset})`);
              if (age > 38) {
                path.push(`Usia > 38 (${age} thn)`);
                rating = 1;
              } else {
                path.push(`Usia <= 38 (${age} thn)`);
                if (empyear > 4) {
                  path.push(`Masa kerja > 4 (${empyear} thn)`);
                  if (debt <= 3.190265) {
                    path.push(`Beban hutang <= 3.190265 (${debt})`);
                    rating = 2;
                  } else {
                    path.push(`Beban hutang > 3.190265 (${debt})`);
                    rating = 5;
                  }
                } else {
                  path.push(`Masa kerja <= 4 (${empyear} thn)`);
                  if (dependents > 5) {
                    path.push(`Tanggungan > 5 (${dependents})`);
                    rating = 5;
                  } else {
                    path.push(`Tanggungan <= 5 (${dependents})`);
                    if (asset <= 480.3312) {
                      path.push(`Aset <= 480.3312 (${asset})`);
                      rating = 5;
                    } else {
                      path.push(`Aset > 480.3312 (${asset})`);
                      rating = 1;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  } else {
    // dependents <= 4
    path.push(`Tanggungan <= 4 (${dependents})`);
    if (dependents > 2) {
      path.push(`Tanggungan 3 - 4 (${dependents})`);
      rating = 3;
    } else {
      // dependents <= 2
      path.push(`Tanggungan <= 2 (${dependents})`);
      if (tenor > 36) {
        path.push(`Tenor > 36 (${tenor} bln)`);
        if (debt <= 0.06666667) {
          path.push(`Beban hutang <= 0.0667 (${debt})`);
          if (debt <= 0.05) {
            path.push(`Beban hutang <= 0.05 (${debt})`);
            rating = 1;
          } else {
            path.push(`Beban hutang > 0.05 (${debt})`);
            rating = 2;
          }
        } else {
          path.push(`Beban hutang > 0.0667 (${debt})`);
          if (dependents > 0) {
            path.push(`Tanggungan > 0 (${dependents})`);
            rating = 3;
          } else {
            path.push(`Tanggungan <= 0 (${dependents})`);
            if (debt <= 0.1) {
              path.push(`Beban hutang <= 0.1 (${debt})`);
              rating = 3;
            } else {
              path.push(`Beban hutang > 0.1 (${debt})`);
              rating = 4;
            }
          }
        }
      } else {
        // tenor <= 36
        path.push(`Tenor <= 36 (${tenor} bln)`);
        if (debt <= 0.05) {
          path.push(`Beban hutang <= 0.05 (${debt})`);
          rating = 1;
        } else {
          path.push(`Beban hutang > 0.05 (${debt})`);
          if (dependents <= 0) {
            path.push(`Tanggungan = 0 (${dependents})`);
            rating = 2;
          } else {
            path.push(`Tanggungan > 0 (${dependents})`);
            if (income > 12.75) {
              path.push(`Pendapatan > 12.75 (${income})`);
              rating = 1;
            } else {
              path.push(`Pendapatan <= 12.75 (${income})`);
              if (empyear <= 1) {
                path.push(`Masa kerja <= 1 (${empyear} thn)`);
                rating = 2;
              } else {
                path.push(`Masa kerja > 1 (${empyear} thn)`);
                if (tenor <= 12) {
                  path.push(`Tenor <= 12 (${tenor} bln)`);
                  if (income <= 9.17) {
                    path.push(`Pendapatan <= 9.17 (${income})`);
                    rating = 2;
                  } else {
                    path.push(`Pendapatan > 9.17 (${income})`);
                    if (dependents <= 1) {
                      path.push(`Tanggungan <= 1 (${dependents})`);
                      rating = 1;
                    } else {
                      path.push(`Tanggungan > 1 (${dependents})`);
                      if (income <= 11.67) {
                        path.push(`Pendapatan <= 11.67 (${income})`);
                        rating = 1;
                      } else {
                        path.push(`Pendapatan > 11.67 (${income})`);
                        rating = 2;
                      }
                    }
                  }
                } else {
                  // tenor > 12
                  path.push(`Tenor > 12 (${tenor} bln)`);
                  if (tenor <= 24) {
                    path.push(`Tenor <= 24 (${tenor} bln)`);
                    if (empyear <= 3) {
                      path.push(`Masa kerja <= 3 (${empyear} thn)`);
                      rating = 2;
                    } else {
                      path.push(`Masa kerja > 3 (${empyear} thn)`);
                      if (income <= 11.58) {
                        path.push(`Pendapatan <= 11.58 (${income})`);
                        rating = 1;
                      } else {
                        path.push(`Pendapatan > 11.58 (${income})`);
                        rating = 2;
                      }
                    }
                  } else {
                    // tenor > 24
                    path.push(`Tenor > 24 (${tenor} bln)`);
                    if (empyear <= 2) {
                      path.push(`Masa kerja <= 2 (${empyear} thn)`);
                      rating = 1;
                    } else {
                      path.push(`Masa kerja > 2 (${empyear} thn)`);
                      if (dependents > 1) {
                        path.push(`Tanggungan > 1 (${dependents})`);
                        rating = 2;
                      } else {
                        path.push(`Tanggungan <= 1 (${dependents})`);
                        if (debt <= 0.5554115) {
                          path.push(`Beban hutang <= 0.5554 (${debt})`);
                          rating = 2;
                        } else {
                          path.push(`Beban hutang > 0.5554 (${debt})`);
                          rating = 1;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  const categoryMap: Record<number, {
    label: string;
    category: 'Sangat Rendah' | 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
    color: string;
    border: string;
    text: string;
  }> = {
    1: {
      label: 'Rating 1 - Risiko Sangat Rendah (Prime / Rekomendasi Tinggi)',
      category: 'Sangat Rendah',
      color: 'bg-emerald-500/20 text-emerald-400',
      border: 'border-emerald-500/40',
      text: 'text-emerald-400'
    },
    2: {
      label: 'Rating 2 - Risiko Rendah (Aman / Layak Disetujui)',
      category: 'Rendah',
      color: 'bg-teal-500/20 text-teal-300',
      border: 'border-teal-500/40',
      text: 'text-teal-300'
    },
    3: {
      label: 'Rating 3 - Risiko Sedang (Moderat / Perlu Analisis Tambahan)',
      category: 'Sedang',
      color: 'bg-amber-500/20 text-amber-300',
      border: 'border-amber-500/40',
      text: 'text-amber-300'
    },
    4: {
      label: 'Rating 4 - Risiko Tinggi (Waspada / Perlu Jaminan Ketat)',
      category: 'Tinggi',
      color: 'bg-orange-500/20 text-orange-400',
      border: 'border-orange-500/40',
      text: 'text-orange-400'
    },
    5: {
      label: 'Rating 5 - Risiko Sangat Tinggi (Sangat Rentan Default)',
      category: 'Sangat Tinggi',
      color: 'bg-rose-500/20 text-rose-400',
      border: 'border-rose-500/40',
      text: 'text-rose-400'
    }
  };

  const info = categoryMap[rating] || categoryMap[3];

  return {
    riskRating: rating,
    riskCode: String(rating),
    ratingLabel: info.label,
    riskCategory: info.category,
    colorBadge: info.color,
    borderBadge: info.border,
    textBadge: info.text,
    decisionRule: path,
  };
}
