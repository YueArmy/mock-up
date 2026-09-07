# Design 04 typefaces

- Shippori Mincho Regular: https://github.com/google/fonts/tree/main/ofl/shipporimincho
- Jost: https://github.com/google/fonts/tree/main/ofl/jost

Both are distributed with their SIL Open Font License files in this directory.
The bundled WOFF files are subsets for the displayed Design 04 copy, renamed
Onlyyuuka Mincho / Onlyyuuka Labels. They use the same letterforms as the
Claude Design UI, without a runtime request to an external font service.

After changing site copy, regenerate with `python3 scripts/build-design04-fonts.py`
(requires fontTools and access to the upstream Google Fonts repository).
