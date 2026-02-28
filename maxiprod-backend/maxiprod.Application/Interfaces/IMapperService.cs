namespace maxiprod.Application.Interfaces
{
    public interface IMapperService
    {
        Target Map<Source, Target>(Source source)
            where Source : class
            where Target : class, new();

        void Map<Source, Target>(Source source, Target target)
            where Source : class
            where Target : class;
    }
}
