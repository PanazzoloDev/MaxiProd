using maxiprod.Application.Interfaces;
using System.Reflection;

namespace maxiprod.Application.Services
{

    public class MapperService : IMapperService
    {
        public Target Map<Source, Target>(Source source)
            where Source : class
            where Target : class, new()
        {
            ArgumentNullException.ThrowIfNull(source);

            var target = new Target();
            Map(source, target);
            return target;
        }

        /// <summary>
        /// Mapeia duas instâncias de objetos, copiando os valores das 
        /// propriedades públicas com o mesmo nome e tipo semelhante.
        /// </summary>
        public void Map<Source, Target>(Source source, Target target)
            where Source : class
            where Target : class
        {
            ArgumentNullException.ThrowIfNull(source);
            ArgumentNullException.ThrowIfNull(target);

            var sourceProps = source.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance);
            var targetProps = target.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance);

            foreach (var targetProp in targetProps)
            {
                var sourceProp = sourceProps.FirstOrDefault(p =>
                    p.Name == targetProp.Name &&
                    p.CanRead &&
                    targetProp.CanWrite &&
                    AreCompatibleTypes(p.PropertyType, targetProp.PropertyType));

                if (sourceProp != null)
                {
                    var value = sourceProp.GetValue(source);

                    if (value != null)
                        targetProp.SetValue(target, value);
                }
            }
        }

        /// <summary>
        ///  Verifica se os tipos de origem e destino são semelhantes
        ///  para mapeamento, unlcuindo tipos anuláveis.
        /// </summary>
        private static bool AreCompatibleTypes(Type sourceType, Type targetType)
        {
            var underlyingSource = Nullable.GetUnderlyingType(sourceType) ?? sourceType;
            var underlyingTarget = Nullable.GetUnderlyingType(targetType) ?? targetType;

            return underlyingSource == underlyingTarget;
        }
    }
    
}
